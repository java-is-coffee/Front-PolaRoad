import AWS from "aws-sdk";
function putFile(file: any) {
  const albumBucketName = process.env.REACT_APP_BUCKET_NAME; // S3의 버킷 이름
  const region = process.env.REACT_APP_BUCKET_REGION; // 서울
  const accessKeyId = process.env.REACT_APP_BUCKET_ACCESS_ID; // IAM에서 생성한 사용자의 accessKeyId
  const secretAccessKey = process.env.REACT_APP_BUCKET_ACCESS_KEY; // IAM에서 생성한 사용자의 secretAccessKey
  console.log(albumBucketName);
  console.log(region);
  console.log(accessKeyId);
  console.log(secretAccessKey);

  AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey,
  });
  if (!albumBucketName || !region || !accessKeyId || !secretAccessKey) {
    console.log("버킷 설정을 확인해주세요");
    return;
  }

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: file.name,
      Body: file,
      ACL: "public-read",
    },
  });

  const promise = upload.promise();

  promise.then(
    function (data) {
      console.log("Successfully uploaded photo.");
    },
    function (err) {
      return console.log(
        "There was an error uploading your photo: ",
        err.message
      );
    }
  );
}

export default putFile;

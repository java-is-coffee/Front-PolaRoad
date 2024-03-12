import modalStyles from "./NewPostModal.module.css";

function NewPostModal() {
  return (
    <div className={modalStyles.modalBackdrop}>
      <div
        className={modalStyles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Create New Post</h2>
        <form>
          <input type="text" placeholder="Title" />
          <textarea placeholder="What's on your mind?" />
          <button type="submit">Post</button>
        </form>
        <button>Close</button>
      </div>
    </div>
  );
}

export default NewPostModal;

export default function ConfirmDialog({title,message,confirmLabel='Confirm',cancelLabel='Cancel',onConfirm,onCancel,danger=false}){
  return <div className="confirm-dialog-backdrop">
    <section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-message">
      <h2 id="confirm-dialog-title">{title}</h2>
      <p id="confirm-dialog-message">{message}</p>
      <div className="confirm-dialog-actions">
        <button type="button" className="confirm-dialog-cancel" onClick={onCancel}>{cancelLabel}</button>
        <button type="button" className={danger?'confirm-dialog-confirm confirm-dialog-danger':'confirm-dialog-confirm'} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </section>
  </div>;
}

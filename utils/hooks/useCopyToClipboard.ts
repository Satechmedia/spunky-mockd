export const useCopyToClipboard = (
  text: string | null | undefined,
  successMessage?: string,
) => {
  navigator.clipboard
    .writeText(text ?? '')
    .then(() => {
      alert(successMessage ?? 'Text copied!');
    })
    .catch((err) => {
      console.log(err.message);
    });
};


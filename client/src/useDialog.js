import { useState } from "react";

function useDialog() {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  return { showDialog, open, close };
}

export default useDialog;

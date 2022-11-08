import { CircularProgress, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function DialogConviteEmail({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value || 0);
  };

  const handleClickConfirmar = () => {
    setLoading(true);
    api({
      url: `usuarios/convite-registro-email`,
      method: "post",
      data: { email },
    })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível enviar o convite por email, tente novamente mais tarde");
      })
      .finally(() => {
        setLoading(false);
        setEmail("");
        handleClose();
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogTitle>Convite por email</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Informe o email abaixo para enviar o convite de cadastro no condomínio.
            </DialogContentText>
            <TextField
              fullWidth
              autoComplete="off"
              label="Email"
              margin="dense"
              name="email"
              value={email}
              onChange={handleChangeEmail}
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={handleClose}>
              Cancelar
            </Button>
            <Button disabled={loading} onClick={handleClickConfirmar}>
              {loading && <CircularProgress size={14} />}
              {!loading && "Confirmar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

import { CircularProgress, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function DialogConviteEmail({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value || "");
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
        <form noValidate onSubmit={handleSubmit(() => handleClickConfirmar())}>
          <DialogTitle>Convite por email</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Informe o email abaixo para enviar o convite de cadastro no condomínio.
            </DialogContentText>
            <TextField
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email Inválido",
                },
              })}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : ""}
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
            <Button disabled={loading} type="submit">
              {loading && <CircularProgress size={14} />}
              {!loading && "Confirmar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

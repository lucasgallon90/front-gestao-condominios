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

export default function DialogCobrancaEmail({ open, setOpen, idCobranca }) {
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
      url: `cobrancas/enviar-email`,
      method: "post",
      data: { id: idCobranca, email },
    })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível enviar a cobrança por email, tente novamente mais tarde");
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
        <form id='form-dialog' noValidate onSubmit={handleSubmit(() => handleClickConfirmar())}>
          <DialogTitle>Enviar cobrança para email</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Caso deseje enviar a cobrança para um email diferente do cadastro do morador, informe abaixo
            </DialogContentText>
            <TextField
              {...register("email", {
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
            <Button id='submit-email' disabled={loading} type="submit">
              {loading && <CircularProgress size={14} />}
              {!loading && "Confirmar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

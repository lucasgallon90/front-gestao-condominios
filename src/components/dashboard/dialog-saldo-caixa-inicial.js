import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import NumericInput from "../common/numeric-input";

export default function DialogSaldoInicialCaixa({ open, setOpen, refreshData }) {
  const [saldoInicial, setSaldoInicial] = useState(0);

  const handleChangeSaldoInicial = (event) => {
    setSaldoInicial(event.target.value || 0);
  };

  const handleClickConfirmar = async () => {
    await api({
      url: `caixa/saldo-inicial`,
      method: "put",
      data: { saldoInicial },
    })
      .then(() => {
        toast.success(`Saldo inicial atualizado com sucesso!`);
        refreshData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível atualizar o saldo inicial, tente novamente mais tarde");
      })
      .finally(() => {
        setSaldoInicial(0);
        handleClose();
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Saldo Inicial</DialogTitle>
        <DialogContent>
          <DialogContentText>
            O caixa inicia com o valor zerado, porém se deseja iniciar com outro valor, informe
            abaixo
          </DialogContentText>
          <NumericInput
            autoFocus
            label="Saldo Inicial"
            margin="dense"
            name="saldoInicial"
            value={saldoInicial}
            onChange={handleChangeSaldoInicial}
          ></NumericInput>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClickConfirmar}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToastSuccess = (mensagem) => {
  toast.success(mensagem, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce
  });
};

const showToastWarn = (mensagem) => {
  toast.warn(mensagem, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce
  });
};

const showToastError = (mensagem) => {
  toast.error(mensagem, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce
  });
};

const showToastInfo = (mensagem) => {
  toast.info(mensagem, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce
  });
};

const showToastDefault = (mensagem) => {
  toast(mensagem, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce
  });
};

export {
  showToastSuccess,
  showToastWarn,
  showToastError,
  showToastInfo,
  showToastDefault
}

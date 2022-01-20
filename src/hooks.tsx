import { useSnackbar, VariantType } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/* Hook for displaying snackbar alerts.
*
* defaultMsg: message to use if no further message provided
* defaultVarint: variant to use if no further variant provided
*/
export const useAlert = (defaultMsg?: string, defaultVariant?: VariantType) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); 
  console.log("Still here")
  const snackbar = (msg?: string, variant?: VariantType) => enqueueSnackbar(defaultMsg || msg, {
    variant: defaultVariant || variant,
    action: (key: any) => (
        <IconButton onClick={() => closeSnackbar(key)}>
            <CloseIcon style={{color: "white"}} />
        </IconButton>
    )
  });

  return snackbar;
}

import { ThemeProvider } from '@material-tailwind/react';
import { Toaster} from 'react-hot-toast';
import GlobalDialog from '../GlobalDialogWrapper/GlobalDialogWrapper';
import AuthGuard from './Authguard';
import { forwardRef } from 'react';

const GlobalProvider = forwardRef(({ children }, ref) => {
  return (
    <ThemeProvider>
       <Toaster position="top-center" />
        <GlobalDialog>
          <AuthGuard>
            {children}
          </AuthGuard>
        </GlobalDialog>
    </ThemeProvider>
  );
});

GlobalProvider.displayName = 'GlobalProvider';

export default GlobalProvider;

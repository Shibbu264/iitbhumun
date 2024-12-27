import { useSelector, useDispatch } from 'react-redux';
import * as Dialog from '@radix-ui/react-dialog';
import { closeDialog } from '../../lib/slices/GlobalDialogWrapperSlice';
import Login from './modals/login';
import Register from './modals/register';
import Logout from './modals/logout';
import { CancelOutlined } from '@mui/icons-material';


export default function GlobalDialog({ children }) {
  const dispatch = useDispatch();
  const { isDialogOpen, dialogType } = useSelector((state) => state.GlobalDialog);

  const handleClose = () => dispatch(closeDialog());

  const renderDialogBody = () => {
    switch (dialogType) {
      case 'login':
        return <Login />;
      case 'logout':
        return <Logout />;
      case 'register':
        return <Register />;
      default:
        return <p>Default Content</p>;
    }
  };

  return (
    <>{children}
      <Dialog.Root onPointerDownOutside={(e) => e.preventDefault()} open={isDialogOpen} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed flex-col items-center left-1/2 top-1/2 md:max-h-[500px] md:mb-0 md:w-fit md:h-fit h-screen w-screen z-[60]  md:max-w-[720px] overflow-y-auto  -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white md:p-0 p-4 shadow-lg"  
          >
            <Dialog.Close onClick={handleClose} className='ml-auto absolute top-4 !right-4 z-50' asChild>
              <CancelOutlined sx={{
                width: "24px",
                height: "24px",
                color: 'white',
              }} />
            </Dialog.Close>
              {renderDialogBody()}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

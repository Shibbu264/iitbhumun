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
          <Dialog.Content className="fixed flex-col items-center left-1/2 top-1/2 md:max-h-[500px] md:mb-0 h-screen w-screen z-[60]  md:max-w-[720px] overflow-y-auto  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white md:p-6 p-4 shadow-lg " style={{backgroundColor: 'transparent',
                                                                                                                                                                                                                                                              marginTop:'20px',   
          }}>
            <Dialog.Close onClick={handleClose} className='sticky top-0 left-full -ml-12 z-50' asChild>
              <CancelOutlined sx={{
                width: "24px",
                height: "24px",
                
                color: 'white',
              }} />
            </Dialog.Close>
            <Dialog.Description className="text-sm relative text-gray-500">
              {renderDialogBody()}
            </Dialog.Description>
            <div className="mt-4 flex justify-end">
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

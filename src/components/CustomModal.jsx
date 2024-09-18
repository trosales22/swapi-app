import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material';

const CustomModal = ({onClose, isOpen, title, children, maxWidth='md', actions}) => {
    const theme = createTheme();

    return (
        <Dialog
            onClose={(event, reason) => {
                if (onClose && reason !== 'backdropClick') {
                    onClose(event, reason);
                }
            }}
            open={isOpen}
            maxWidth={maxWidth}
            fullWidth
        >
            <DialogTitle sx={{ 
                m: 0, 
                p: 2,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
            }}>
                {title}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'white'
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                {children}
            </DialogContent>

            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    );
}

CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    actions: PropTypes.node,
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'false'])
};

export default CustomModal;
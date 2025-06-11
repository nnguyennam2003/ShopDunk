import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { addAddress, deleteAddress, getAddressDefault, getAddresses, setDefaultAddress, updateAddress } from '../controllers/address.controller.js';

const router = express.Router()

router.get('/', protect, getAddresses)
router.post('/', protect, addAddress)
router.put('/:id', protect, updateAddress)
router.delete('/:id', protect, deleteAddress)
router.patch('/:id/default', protect, setDefaultAddress)
router.get('/default', protect, getAddressDefault)

export default router
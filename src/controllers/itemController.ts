import { Request, Response } from 'express';
import { Item } from '../models/item';

const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req: Request, res: Response): Promise<void> => {
  const { name, quantity } = req.body;

  const item = new Item({
    name,
    quantity,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateItem = async (req: Request, res: Response): Promise<void> => {
  const { name, quantity } = req.body;

  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { name, quantity }, { new: true });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getItems, getItem, createItem, updateItem, deleteItem };

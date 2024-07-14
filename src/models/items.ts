import { Schema, model, Document } from 'mongoose';

interface IItem extends Document {
  name: string;
  quantity: number;
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Item = model<IItem>('Item', itemSchema);

export { Item, IItem };

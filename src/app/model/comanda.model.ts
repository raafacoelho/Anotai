import { Item } from './item.model';
import { StatusComanda } from '../enum/status-comanda.enum';

export interface Comanda{
    Item: Item[]
    status: StatusComanda; 
    idEmpresa: string
}
import {useDrop, DropTargetMonitor} from 'react-dnd';
import ItemTypes from '../../resources/itemTypes';
import {useTheme} from '../../hooks/theme';
//import {darkenColor} from '../../resources/functions';
//import {api} from '../../resources/api';
//import {IDistribProps} from '../../resources/interfaces';
import {TrashContainer} from './styles';
/* import { SelectableContainer } from "./styles";
import { useState } from "react";
 */

export interface ITaskTrashProps {
   //distrib_Id?: string;
   handleDistribsDel: (distrib_Id: string) => void;
   children?: React.ReactNode;
}

interface IItemProps {
   type: string;
   profiss_Id: string;
   profiss_name: string;
   color: string;
   obs: string;
   children: React.ReactNode;
   distrib_Id?: string;
}

const TaskTrash: React.FC<ITaskTrashProps> = ({
   //distrib_Id,
   handleDistribsDel,
   children,
}) => {
   const theme = useTheme();
   const [{isOver}, drop] = useDrop({
      accept: ItemTypes.CARD,
      collect: monitor => ({
         isOver: !!monitor.isOver(),
      }),
      drop: async (item: IItemProps, monitor: DropTargetMonitor) => {
         //-- console.log  --------------------------
         console.log(
            `item: ${item.profiss_Id} - ${item.profiss_name} - ${item.color} - ${item.obs}`,
         );
         console.log(`distrib_Id: ${item.distrib_Id}`);
         //------------------------------------------
         handleDistribsDel(item.distrib_Id!);
      },
   });
   return (
      <TrashContainer
         ref={drop}
         style={{
            height: '30px',
            width: '60px',
            borderRadius: '5px',
            border: `1px solid ${theme.theme.colors.white}`,
            backgroundColor: isOver
               ? theme.theme.colors.primary
               : theme.theme.colors.tertiary,
         }}>
         <p>{children}</p>
      </TrashContainer>
   );
};

export default TaskTrash;

import { useDrop, DropTargetMonitor } from "react-dnd";
import ItemTypes from "../../resources/itemTypes";
import { useTheme } from '../../hooks/theme';
import { darkenColor } from "../../resources/functions";
import { api } from "../../resources/api";
import { IDistribProps } from "../../resources/interfaces";
/* import { SelectableContainer } from "./styles";
import { useState } from "react";
 */

export interface ITaskTrashProps {
   distrib_Id?: string;
   handleDistribsDel: (distrib_id: string) => void;
}

interface IItemProps {
   type: string;
   profiss_Id: string;
   profiss_name: string;
   color: string;
   obs: string;
}

const TaskTrash: React.FC<ITaskTrashProps> = ({
   distrib_Id,
   handleDistribsDel
}) => {
   const theme = useTheme();
   const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.CARD,
      collect: (monitor) => ({
         isOver: !!monitor.isOver(),
      }),
      drop: async (item: IItemProps, monitor: DropTargetMonitor) => {
         try {
            console.log(`item: ${item.profiss_Id} - ${item.profiss_name} - ${item.color} - ${item.obs}`);

            console.log(`distrib_Id: ${distrib_Id}`);
            if(!distrib_Id) {
               alert(`Erro ao excluir distribuição: distrib_Id não informado!`);
               return;
            }

            // const response = await api.delete(`api/distrib/${distrib_Id}`);
            // handleDistribsDel(response.data.distrib_Id);
            alert(`Distribuição excluída com sucesso!`);
         } catch (error) {
            alert(`Erro ao excluir distribuição: ${error}`);
         }
         console.log();
      },
   });
return (
   <div
   ref={drop}
   style={{
      height: '30px',
      width: '60px',
      borderRadius: '5px',
      border: `1px solid ${theme.theme.colors.white}`,
      backgroundColor: isOver
         ? theme.theme.colors.primary
         : theme.theme.colors.tertiary
   }}>
      <p>{""}</p>
   </div>
)
};

export default TaskTrash;

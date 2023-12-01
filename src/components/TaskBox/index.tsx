import { useDrop, DropTargetMonitor } from "react-dnd";
import ItemTypes from "../../resources/itemTypes";
import { useTheme } from '../../hooks/theme';
import { darkenColor } from "../../resources/functions";
import { api } from "../../resources/api";
import { IDistribProps } from "../../resources/interfaces";
/* import { SelectableContainer } from "./styles";
import { useState } from "react";
 */

export interface ITaskBoxProps {
   dia: string;
   mes: string;
   ano: string;
   group_Id: string;
   scale_Id: string;
   scale_name: string;
   handleDistribs: (distr: IDistribProps) => void;

   children?: React.ReactNode;
   profiss_Id?: string;
   profiss_name?: string;
   color?: string;
   obs?: string;
}

interface IItemProps {
   type: string;
   profiss_Id: string;
   profiss_name: string;
   color: string;
   obs: string;
}

const TaskBox: React.FC<ITaskBoxProps> = ({
   dia,
   mes,
   ano,
   group_Id,
   scale_Id,
   scale_name,
   profiss_Id,
   profiss_name,
   color,
   obs,
   handleDistribs,
}) => {
   const theme = useTheme();
   const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.CARD,
      collect: (monitor) => ({
         isOver: !!monitor.isOver(),
      }),
      drop: async (item: IItemProps, monitor: DropTargetMonitor) => {
         try {
            const response = await api.post("api/distrib", {
               data: `${ano}-${mes}-${dia}T03:00:00.000Z`,
               obs: "",
               profiss_Id: item.profiss_Id,
               group_Id: group_Id,
               scale_Id: scale_Id,
            });
            handleDistribs({
               id: response.data.distrib_Id,
               data: new Date(`${ano}-${mes}-${dia}T03:00:00.000Z`),
               dia: dia,
               mes: mes,
               obs: "",
               color: item.color,
               profiss_id: item.profiss_Id,
               profiss_name: item.profiss_name,
               scale_id: scale_Id,
               scale_name: scale_name,
            })
         } catch (error) {
            alert(`Erro ao criar distribuição: ${error}`);
         }
         console.log();
      },
   });
   if (profiss_Id) {
      return (
         <div
            ref={drop}
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100%",
               width: "100%",
               backgroundColor: isOver
                  ? (color
                     ? darkenColor(color, 30)
                     : theme.theme.colors.primary)
                  : color,
            }}>
            <p>{profiss_name + " " + obs}</p>

         </div>
      );
   } else {
      return (
         <div
            ref={drop}
            style={{
               height: "100%",
               width: "100%",
               backgroundColor: isOver
                  ? theme.theme.colors.primary
                  : theme.theme.colors.secondary
            }}>
            <p >{""}</p>
         </div>
      );
   }
};

export default TaskBox;

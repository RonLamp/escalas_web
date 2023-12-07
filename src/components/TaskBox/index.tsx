import {useDrop, DropTargetMonitor} from 'react-dnd';
import ItemTypes from '../../resources/itemTypes';
import {useTheme} from '../../hooks/theme';
import {darkenColor} from '../../resources/functions';
import {IDistribProps} from '../../resources/interfaces';

export interface ITaskBoxProps {
   dia: string;
   mes: string;
   ano: string;
   group_Id: string;
   scale_Id: string;
   scale_name: string;
   handleDistribsAdd: (distr: IDistribProps) => void;
   handleDistribsChgPlus: (distr: IDistribProps, distrib_id: string) => void;
   handleDistribsUpdt: (distr: IDistribProps, distrib_id: string) => void;
   handleDistribsChg: (
      distr: IDistribProps,
      distrib_id_in: string,
      distrib_id_out: string,
   ) => void;
   children?: React.ReactNode;

   profiss_Id?: string;
   profiss_name?: string;
   color?: string;
   obs?: string;
   id?: string;
}

interface IItemProps {
   type: string;
   profiss_Id: string;
   profiss_name: string;
   color: string;
   obs: string;
   distrib_Id?: string;
}

const TaskBox: React.FC<ITaskBoxProps> = ({
   dia,
   mes,
   ano,
   group_Id,
   scale_Id,
   scale_name,
   handleDistribsAdd,
   handleDistribsChgPlus,
   handleDistribsChg,
   handleDistribsUpdt,
   children,

   profiss_Id,
   profiss_name,
   color,
   id,
   //obs,
}) => {
   const theme = useTheme();
   const [{isOver}, drop] = useDrop({
      accept: ItemTypes.CARD,
      collect: monitor => ({
         isOver: !!monitor.isOver(),
      }),
      drop: async (item: IItemProps, monitor: DropTargetMonitor) => {
         //-- console.log  --------------------------
         // console.log(`item (In): ${item.profiss_Id} - ${item.profiss_name}`);
         // console.log(`distrib_Id: ${item.distrib_Id}`);
         // console.log(`profiss_Id (out): ${profiss_Id}- ${profiss_name}`);
         // console.log(`id (out): ${id}`);
         //------------------------------------------
         const data: IDistribProps = {
            data: new Date(`${ano}-${mes}-${dia}T03:00:00.000Z`),
            dia: dia,
            mes: mes,
            ano: ano,
            obs: item.obs,
            color: item.color,
            profiss_id: item.profiss_Id,
            profiss_name: item.profiss_name,
            scale_id: scale_Id,
            scale_name: scale_name,
            group_id: group_Id,
         };
         if (item.distrib_Id === undefined) {
            // Origem vazia (Empty)
            if (profiss_Id === undefined) {
               // Destino vazio (Empty)
               handleDistribsAdd(data);
            } else {
               // Destino cheio (Full)
               const confirmacao = window.confirm(
                  `Deseja trocar o profissional ${profiss_name} por ${item.profiss_name}?`,
               );
               if (confirmacao) {
                  handleDistribsChgPlus(data, id ? id : '');
               }
            }
         } else {
            // Origem cheia (Full)
            if (profiss_Id === undefined) {
               //-- Destino vazio (Empty)
               handleDistribsUpdt(data, item.distrib_Id ? item.distrib_Id : '');
            } else {
               //-- Destino cheio (Full)
               const confirmacao = window.confirm(
                  `Deseja trocar o profissional ${profiss_name} por ${item.profiss_name}?`,
               );
               if (confirmacao) {
                  handleDistribsChg(
                     data,
                     id ? id : '',
                     item.distrib_Id ? item.distrib_Id : '',
                  );
               }
            }
         }
      },
   });

   if (profiss_Id) {
      return (
         <div
            ref={drop}
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '100%',
               width: '100%',
               backgroundColor: isOver
                  ? color
                     ? darkenColor(color, 30)
                     : theme.theme.colors.primary
                  : color,
            }}>
            <div>{children}</div>
         </div>
      );
   } else {
      return (
         <div
            ref={drop}
            style={{
               height: '100%',
               width: '100%',
               backgroundColor: isOver
                  ? theme.theme.colors.primary
                  : theme.theme.colors.secondary,
            }}>
            <p>{''}</p>
         </div>
      );
   }
};

export default TaskBox;

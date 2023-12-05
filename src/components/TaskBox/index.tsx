import {useDrop, DropTargetMonitor} from 'react-dnd';
import ItemTypes from '../../resources/itemTypes';
import {useTheme} from '../../hooks/theme';
import {darkenColor} from '../../resources/functions';
import {api} from '../../resources/api';
import {IDistribProps} from '../../resources/interfaces';
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
   handleDistribsDel: (distrib_id: string) => void;
   handleDistribsChg: (distr: IDistribProps, distrib_id: string) => void;
   handleDistribsUpdt: (distrib_id_in: string, distrib_id_out: string) => void;

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
   profiss_Id,
   profiss_name,
   color,
   id,
   //obs,
   handleDistribs,
   handleDistribsUpdt,
   handleDistribsChg,
   children,
}) => {
   const theme = useTheme();
   const [{isOver}, drop] = useDrop({
      accept: ItemTypes.CARD,
      collect: monitor => ({
         isOver: !!monitor.isOver(),
      }),
      drop: async (item: IItemProps, monitor: DropTargetMonitor) => {
         // console.log(
         //    `item: ${item.profiss_Id} - ${item.profiss_name} - ${item.distrib_Id} - ${item.color}`,
         // );
         if (item.distrib_Id === undefined) {
            try {
               const response = await api.post('api/distrib', {
                  data: `${ano}-${mes}-${dia}T03:00:00.000Z`,
                  obs: '',
                  profiss_Id: item.profiss_Id,
                  group_Id: group_Id,
                  scale_Id: scale_Id,
               });
               handleDistribs({
                  id: response.data.distrib_Id,
                  data: new Date(`${ano}-${mes}-${dia}T03:00:00.000Z`),
                  dia: dia,
                  mes: mes,
                  ano: ano,
                  obs: '',
                  color: item.color,
                  profiss_id: item.profiss_Id,
                  profiss_name: item.profiss_name,
                  scale_id: scale_Id,
                  scale_name: scale_name,
               });
            } catch (error) {
               alert(`Erro ao criar distribuição: ${error}`);
            }
         } else {
            console.log(`profiss_ID (tá chegando): ${item.profiss_Id}`);
            console.log(`profiss_Id (tá aki): ${profiss_Id}`);
            if (profiss_Id) {
               //----- alerta yes ou no  --------------------------------
               const confirmacao = window.confirm(
                  `Deseja trocar o profissional ${profiss_name} por ${item.profiss_name}?`,
               );
               if (confirmacao) {
                  // Código a ser executado se o usuário clicar em "OK"
                  // console.log('Usuário deseja trocar de profissional');
                  // Adicione aqui a lógica para a troca de profissional, se necessário
                  //-----------  CONSULTAR A DISTRIB QUE ESTÁ CHEGANDO DA BASE DE DADOS ---
                  //-----------  OU CONSULTAR A DISTRIB QUE ESTÁ NO ESTADO ----------------
                  try {
                     // await api.delete(`api/distrib/${item.distrib_Id}`);
                     // await api.delete(`api/distrib/${id}`);
                     // const response = await api.post('api/distrib', {
                     //    data: `${ano}-${mes}-${dia}T03:00:00.000Z`,
                     //    obs: '',
                     //    profiss_Id: profiss_Id,
                     //    group_Id: group_Id,
                     //    scale_Id: scale_Id,
                     // });
                     handleDistribsUpdt(
                        // {
                        //    id: response.data.distrib_Id,
                        //    data: new Date(`${ano}-${mes}-${dia}T03:00:00.000Z`),
                        //    dia: dia,
                        //    mes: mes,
                        //    ano: ano,
                        //    obs: '',
                        //    color: color,
                        //    profiss_id: profiss_Id,
                        //    profiss_name: profiss_name,
                        //    scale_id: scale_Id,
                        //    scale_name: scale_name,
                        // },
                        item.distrib_Id,
                        id ? id : '',
                     );
                  } catch (error) {
                     alert(`Erro ao criar distribuição: ${error}`);
                  }
               } else {
                  // Código a ser executado se o usuário clicar em "Cancelar"
                  // console.log('Usuário cancelou a troca de profissional');
                  return;
                  // Adicione aqui a lógica para lidar com o cancelamento, se necessário
               }

               //----- trocar o profissional  --------------------------------
            } else {
               try {
                  await api.delete(`api/distrib/${item.distrib_Id}`);
                  const response = await api.post('api/distrib', {
                     data: `${ano}-${mes}-${dia}T03:00:00.000Z`,
                     obs: '',
                     profiss_Id: item.profiss_Id,
                     group_Id: group_Id,
                     scale_Id: scale_Id,
                  });
                  handleDistribsChg(
                     {
                        id: response.data.distrib_Id,
                        data: new Date(`${ano}-${mes}-${dia}T03:00:00.000Z`),
                        dia: dia,
                        mes: mes,
                        ano: ano,
                        obs: '',
                        color: item.color,
                        profiss_id: item.profiss_Id,
                        profiss_name: item.profiss_name,
                        scale_id: scale_Id,
                        scale_name: scale_name,
                     },
                     item.distrib_Id,
                  );
               } catch (error) {
                  alert(`Erro ao criar distribuição: ${error}`);
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

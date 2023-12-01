import {useDrag} from 'react-dnd';
import ItemTypes from '../../resources/itemTypes';

export interface ITaskScaleProps {
   profiss_Id?: string;
   profiss_name?: string;
   color?: string;
   obs?: string;

   distrib_Id?: string;
   children?: React.ReactNode;
}

const TaskScale: React.FC<ITaskScaleProps> = ({
   profiss_Id,
   profiss_name,
   color,
   obs,
   distrib_Id,
}) => {
   const [{isDragging}, drag] = useDrag(
      () => ({
         type: ItemTypes.CARD,
         item: {
            type: ItemTypes.CARD,
            profiss_Id,
            profiss_name,
            color,
            obs,
            distrib_Id,
         },
         collect: monitor => ({
            isDragging: monitor.isDragging(),
         }),
      }),
      [profiss_Id, profiss_name, color, obs, distrib_Id],
   );

   return (
      <div
         ref={drag}
         style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
            backgroundColor: color,
            width: '100%',
            height: '100%',
            textAlign: 'center',
            marginRight: '5px',
            marginTop: '5px',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: isOver
            //    ? color
            //       ? darkenColor(color, 30)
            //       : theme.theme.colors.primary
            //    : color,
         }}>
         <p>{profiss_name + ' ' + obs}</p>
      </div>
   );
};

export default TaskScale;

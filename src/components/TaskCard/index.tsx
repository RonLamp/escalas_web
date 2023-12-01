import {useDrag} from 'react-dnd';
import ItemTypes from '../../resources/itemTypes';

export interface ITaskCardProps {
   profiss_Id: string;
   profiss_name: string;
   color: string;
   obs: string;
}

const TaskCard: React.FC<ITaskCardProps> = ({
   profiss_Id,
   profiss_name,
   color,
   obs,
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
         },
         collect: monitor => ({
            isDragging: monitor.isDragging(),
         }),
      }),
      [profiss_Id, profiss_name, color, obs],
   );
   return (
      <div
         ref={drag}
         style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
            backgroundColor: color,
            width: '150px',
            height: '20px',
            textAlign: 'center',
            marginRight: '20px',
            marginTop: '5px',
            borderRadius: '5px',
         }}>
         {profiss_name + ' ' + obs}
      </div>
   );
};

export default TaskCard;

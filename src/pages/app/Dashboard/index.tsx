import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
   Container,
   TdCaptionTable,
   TTable,
   TheadFirstTable,
   TdFirstLeftTable,
   TdFirstTable,
   TrFirstTable,
   TheadSubTitleTable,
   TdSubTitleLeftTable,
   TdSubTitleTable,
   TrSubTitleTable,
   TheadTable,
   TdLeftTable,
   TdTable,
   TrTable,
} from './styles';

import ContentHeader from '../../../components/ContentHeader';
import SelectInput from '../../../components/SelectInput';
import SelectInputGroup from '../../../components/SelectInputGroup';
import {months, years, weekDays} from '../../../resources/configs';
import {useAuth} from '../../../hooks/auth';
import {api} from '../../../resources/api';
import dayjs from 'dayjs';
import {
   IDadosProps,
   IDistribProps,
   IProfissGroupProps,
} from '../../../resources/interfaces';
import axios, {AxiosError} from 'axios';
import {IoTrashOutline} from 'react-icons/io5';

import TaskCard from '../../../components/TaskCard';
import TaskBox from '../../../components/TaskBox';
import TaskTrash from '../../../components/TaskTrash';
import TaskScale from '../../../components/TaskScale';
import {set} from 'react-hook-form';

/* interface IDistribProps {
  id: string;
  data: Date;
  dia: string;
  mes: string;
  obs?: string | null;
  color?: string;
  profiss_id?: string;
  profiss_name?: string;
  scale_id: string;
  scale_name: string;
}
interface IProfissGroupProps {
  profiss_Id: string;
  profiss_name: string;
  color: string;
}
*/

const Dashboard: React.FC = () => {
   const [groups, setGroups] = useState<IDadosProps[]>([]);
   const [groupSelected, setGroupSelected] = useState<string>('0');
   const groupName = useRef<string>('0');
   const [distribs, setDistribs] = useState<IDistribProps[]>([]);

   const [profisss, setProfiss] = useState<IProfissGroupProps[]>([]);
   const [profissSelected, setProfissSelected] = useState<IProfissGroupProps>({
      profiss_Id: '',
      profiss_name: '',
      color: '',
   });

   const [mesSelected, setMesSelected] = useState<string>(
      (dayjs().month() + 1).toString().padStart(2, '0'),
   );
   const [anoSelected, setAnoSelected] = useState<string>(
      dayjs().year().toString(),
   );
   const startDate = useRef<string>(
      dayjs()
         .startOf('month')
         .subtract(dayjs().startOf('months').day(), 'days')
         .format('YYYY-MM-DD'),
   );
   const endDate = useRef<string>(
      dayjs()
         .endOf('month')
         .add(6 - dayjs().endOf('months').day(), 'days')
         .format('YYYY-MM-DD'),
   );
   const dateArray = useRef<string[]>([]);
   const linhasArray = useRef<number[]>([]);

   //---  Carregando o dateArray com as datas do mês
   dateArray.current = [];
   let currentDate = dayjs(startDate.current);
   while (currentDate <= dayjs(endDate.current)) {
      dateArray.current.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
   }
   const linhas = dateArray.current.length / 7;
   linhasArray.current = Array.from({length: linhas}, (_, index) => index);

   const colunasArray = [0, 1, 2, 3, 4, 5, 6]; //- Referente Horarios + dias da semana

   const horarios = useRef<IDadosProps[]>([]);
   const horariosLength = useRef<number>(0);

   const {signOut} = useAuth();

   useEffect(() => {
      const fetchData = async () => {
         await api.get(`/api/null`);
         const response2 = await api.get(`/api/groups/select`);
         const array2: IDadosProps[] = response2.data;
         array2.sort((a, b) => a.name.localeCompare(b.name));
         setGroups([{id: '0', name: ''}, ...array2]);
      };
      fetchData().catch((error: Error | AxiosError) => {
         console.log(error);
         if (axios.isAxiosError(error)) {
            // AxiosError possui a propriedade response
            if (error.response?.status === 401) {
               signOut();
            }
         }
      });
   }, [distribs]);

   const handleChangeData = (mes: string, ano: string) => {
      //--- Carrega o primeiro dia do calendario
      const startday = dayjs(`${ano}/${parseInt(mes).toString()}/01`);
      startDate.current = startday
         .startOf('month')
         .subtract(startday.startOf('month').day(), 'days')
         .format('YYYY-MM-DD');
      //--- Carrega o ultimo dia do calendario
      const endday = startday
         .endOf('month')
         .add(6 - dayjs().endOf('months').day(), 'days')
         .format('YYYY-MM-DD');
      endDate.current = endday;
      //--  Carregando o dateArray com as datas do calendario
      dateArray.current = [];
      let currentDate = dayjs(startDate.current);
      while (currentDate <= dayjs(endDate.current)) {
         dateArray.current.push(currentDate.format('YYYY-MM-DD'));
         currentDate = currentDate.add(1, 'day');
      }
      const linhas = dateArray.current.length / 7;
      linhasArray.current = Array.from({length: linhas}, (_, index) => index);
      setDistribs([]);
      setProfissSelected({profiss_Id: '', profiss_name: '', color: ''});
      setProfiss([]);
      setGroups([]);
      setGroupSelected('0');
   };

   const handleChangeGroup = async (
      e: React.ChangeEvent<HTMLSelectElement>,
   ) => {
      if (e.target.value === '0') {
         setGroupSelected('0');
         setDistribs([]);
         return;
      }
      groupName.current =
         groups.find(item => item.id === e.target.value)?.name || '0';
      setGroupSelected(e.target.value);
      const response3 = await api.get(`/api/scales/group/${e.target.value}`);
      const array3: IDadosProps[] = response3.data;
      array3.sort((a, b) => a.name.localeCompare(b.name));
      horarios.current = array3;
      horariosLength.current = array3.length;
      try {
         //----------------------------------------------------------------------------
         const response4 = await api.post(`/api/distribs/${e.target.value}`, {
            dataIni: startDate.current + `T03:00:00.000Z`,
            dataFim: endDate.current + `T03:00:00.000Z`,
         });
         setDistribs(response4.data);
         //----------------------------------------------------------------------------
         const response5 = await api.get(
            `/api/profisss/group/${e.target.value}`,
         );
         setProfiss(response5.data);
         setProfissSelected(response5.data[0]);
         //----------------------------------------------------------------------------
      } catch (error) {
         console.log(error);
         if (axios.isAxiosError(error)) {
            // AxiosError possui a propriedade response
            if (error.response?.status === 401) {
               signOut();
            }
         }
      }
   };

   const handleProfissSelected = (profiss_Id: string) => {
      const profiss = profisss.find(item => item.profiss_Id === profiss_Id);
      if (profiss) {
         setProfissSelected(profiss);
      }
   };

   const handleDistribs = (distrib: IDistribProps) => {
      setDistribs([...distribs, distrib]);
   };

   const handleDistribsDel = (distribID: string) => {
      const noItemDistrib = distribs.filter(item => item.id !== distribID);
      setDistribs(noItemDistrib);
   };

   const handleDistribsChg = (distrib: IDistribProps, distribID: string) => {
      const noItemDistrib = distribs.filter(item => item.id !== distribID);
      setDistribs([...noItemDistrib, distrib]);
   };

   const handleDistribsUpdt = async (
      //distrib: IDistribProps,
      distribID_In: string,
      distribID_Out: string,
   ) => {
      // Delete a distribuicao de entrada e atualiza a de saida
      const distrib_In: IDistribProps | undefined = distribs.find(
         item => item.id === distribID_In,
      );
      if (!distrib_In) {
         return;
      }
      const distrib_Out: IDistribProps | undefined = distribs.find(
         item => item.id === distribID_Out,
      );
      if (!distrib_Out) {
         return;
      }
      distrib_Out.id = distrib_In.id;
      distrib_Out.obs = distrib_In.obs;
      distrib_Out.color = distrib_In.color;
      distrib_Out.profiss_id = distrib_In.profiss_id;
      distrib_Out.profiss_name = distrib_In.profiss_name;
      // Filtra distrib para exclui a distribuição com distribID_In e distribID_Out
      const distribF = distribs.filter(item => item.id !== distribID_In);
      const distribG = distribF.filter(item => item.id !== distribID_Out);
      // Atualiza a distribuição com distrib_Out modificado
      setDistribs([...distribG, distrib_Out]);
      // Delete distribuição de entrada
      await api.delete(`api/distrib/${distribID_In}`);
      // Update distribuição de saida
      await api.patch(`api/distrib/${distribID_Out}`, {
         obs: distrib_Out.obs,
         profiss_id: distrib_Out.profiss_id,
         // scale_id: distrib_Out.scale_id,
      });
   };
   return (
      <Container>
         <ContentHeader title="Escala" linecolor="#ff5100ff">
            <TaskCard
               profiss_Id={profissSelected ? profissSelected.profiss_Id : ''}
               profiss_name={
                  profissSelected ? profissSelected.profiss_name : ''
               }
               color={profissSelected ? profissSelected.color : ''}
               obs=""
            />
            <SelectInputGroup
               options={profisss}
               onChange={e => {
                  e.preventDefault();
                  handleProfissSelected(e.target.value);
               }}
            />
            <SelectInput
               options={groups}
               selectedid={'0'}
               onChange={e => {
                  e.preventDefault();
                  handleChangeGroup(e);
               }}
            />
            <SelectInput
               options={months}
               selectedid={mesSelected}
               onChange={e => {
                  e.preventDefault();
                  setMesSelected(e.target.value);
                  handleChangeData(e.target.value, anoSelected);
               }}
            />
            <SelectInput
               options={years}
               selectedid={anoSelected}
               onChange={e => {
                  e.preventDefault();
                  setAnoSelected(e.target.value);
                  handleChangeData(mesSelected, e.target.value);
               }}
            />
            {/* <div style={{height:"30px", width:"30px", backgroundColor:"red"}}> */}
            <div></div>
            <TaskTrash handleDistribsDel={handleDistribsDel}>
               <IoTrashOutline />
            </TaskTrash>
            {/* </div> */}
            {/* <TrashInput isSelected ><TaskTrash handleDistribsDel={handleDistribsDel} /></TrashInput> */}
         </ContentHeader>
         <TTable>
            <TdCaptionTable>
               <p>
                  ESCALA: {groupName.current.toUpperCase()}{' '}
                  {parseInt(mesSelected)}/{anoSelected}
               </p>
            </TdCaptionTable>

            <TheadFirstTable>
               <TrFirstTable>
                  <TdFirstLeftTable>--##--</TdFirstLeftTable>
                  {weekDays.map((day, index) => (
                     <TdFirstTable key={index}>{day.name}</TdFirstTable>
                  ))}
               </TrFirstTable>
            </TheadFirstTable>

            {linhasArray.current.map((linha, indexl) => (
               <Fragment key={indexl}>
                  <TheadSubTitleTable>
                     <TrSubTitleTable>
                        <TdSubTitleLeftTable>Horários</TdSubTitleLeftTable>
                        {colunasArray.map((coluna, indexc) => (
                           <TdSubTitleTable key={indexc}>
                              {'' +
                                 dateArray.current[
                                    coluna + linha * 7
                                 ].substring(8, 10) +
                                 ' '}
                           </TdSubTitleTable>
                        ))}
                     </TrSubTitleTable>
                  </TheadSubTitleTable>

                  <TheadTable>
                     {horarios.current.map((horario, indexh) => (
                        <TrTable key={indexh}>
                           <TdLeftTable>{horario.name}</TdLeftTable>
                           {colunasArray.map((coluna, indexc) => {
                              const distrib = distribs.find(
                                 item =>
                                    item.scale_id === horario.id &&
                                    item.dia ===
                                       dateArray.current[
                                          coluna + linha * 7
                                       ].substring(8, 10) &&
                                    item.mes ===
                                       dateArray.current[
                                          coluna + linha * 7
                                       ].substring(5, 7) &&
                                    item.mes ===
                                       parseInt(mesSelected).toString(),
                              );
                              if (distrib) {
                                 return (
                                    <TdTable
                                       key={indexc}
                                       style={{backgroundColor: distrib.color}}>
                                       <TaskBox
                                          dia={distrib.dia}
                                          mes={distrib.mes}
                                          ano={anoSelected}
                                          group_Id={groupSelected}
                                          scale_Id={horario.id}
                                          scale_name={horario.name}
                                          profiss_Id={distrib.profiss_id}
                                          profiss_name={distrib.profiss_name}
                                          color={distrib.color}
                                          obs={distrib.obs ? distrib.obs : ''}
                                          id={distrib.id}
                                          handleDistribs={handleDistribs}
                                          handleDistribsDel={handleDistribsDel}
                                          handleDistribsUpdt={
                                             handleDistribsUpdt
                                          }
                                          handleDistribsChg={handleDistribsChg}>
                                          <TaskScale
                                             profiss_Id={distrib.profiss_id}
                                             profiss_name={distrib.profiss_name}
                                             color={distrib.color}
                                             obs={
                                                distrib.obs ? distrib.obs : ''
                                             }
                                             distrib_Id={distrib.id}
                                          />
                                       </TaskBox>
                                    </TdTable>
                                 );
                              } else {
                                 if (
                                    mesSelected ===
                                    dateArray.current[
                                       coluna + linha * 7
                                    ].substring(5, 7)
                                 ) {
                                    return (
                                       <TdTable key={indexc}>
                                          <TaskBox
                                             dia={dateArray.current[
                                                coluna + linha * 7
                                             ].substring(8, 10)}
                                             mes={dateArray.current[
                                                coluna + linha * 7
                                             ].substring(5, 7)}
                                             ano={anoSelected}
                                             group_Id={groupSelected}
                                             scale_Id={horario.id}
                                             scale_name={horario.name}
                                             handleDistribs={handleDistribs}
                                             handleDistribsUpdt={
                                                handleDistribsUpdt
                                             }
                                             handleDistribsDel={
                                                handleDistribsDel
                                             }
                                             handleDistribsChg={
                                                handleDistribsChg
                                             }
                                          />
                                       </TdTable>
                                    );
                                 } else {
                                    return <TdTable key={indexc}></TdTable>;
                                 }
                              }
                           })}
                        </TrTable>
                     ))}
                  </TheadTable>
               </Fragment>
            ))}
            {/*  < tfoot > {
               distribs.map((item) => (
                  <tr key={item.id}>
                     <td>{dayjs(item.data).toISOString()}</td>
                     <td>{item.dia}</td>
                     <td>{item.obs}</td>
                     <td>{item.color}</td>
                     <td>{item.profiss_id}</td>
                     <td>{item.profiss_name}</td>
                     <td>{item.scale_id}</td>
                     <td>{item.scale_name}</td>
                  </tr>
               ))
            }
               < p > Here</p >
            </tfoot > */}
         </TTable>
      </Container>
   );
};

export default Dashboard;

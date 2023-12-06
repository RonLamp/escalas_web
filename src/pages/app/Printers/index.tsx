import React, {useEffect, useRef, useState} from 'react';
import {
   Container,
   TdCaptionTable,
   TTable,
   TheadFirstTable,
   TrFirstTable,
   TheadTable,
   TdLeftTable,
   TdTable,
   TdRightTable,
   TrTable,
   TdFirstTableP,
   TdFirstTableC,
   TdFirstTableH,
   TdFirstTableD,
   TFood,
   TDFood,
} from './styles';

import ContentHeader from '../../../components/ContentHeader';
import SelectInput from '../../../components/SelectInput';
import {months, years, alocacoes} from '../../../resources/configs';
import {useAuth} from '../../../hooks/auth';
import {api} from '../../../resources/api';
import dayjs from 'dayjs';
import {IDadosProps} from '../../../resources/interfaces';
import axios, {AxiosError} from 'axios';

interface IEfetividadeProps {
   nome: string;
   crm: string;
   totalHoras: number;
   diasTurno: string[];
}

const Printers: React.FC = () => {
   const [efetividade, setEfetividade] = useState<IEfetividadeProps[]>([]);

   const [alocacao, setAlocacao] = useState<IDadosProps[]>([]);
   const [alocacaoSelected, setAlocacaoSelected] = useState<string>('0');

   const [groups, setGroups] = useState<IDadosProps[]>([]);
   const [groupSelected, setGroupSelected] = useState<string>('0');

   const [mesSelected, setMesSelected] = useState<string>(
      (dayjs().month() + 1).toString().padStart(2, '0'),
   );
   const [anoSelected, setAnoSelected] = useState<string>(
      dayjs().year().toString(),
   );
   const startDate = useRef<string>(
      dayjs().startOf('month').format('YYYY-MM-DD'),
   );
   const endDate = useRef<string>(dayjs().endOf('month').format('YYYY-MM-DD'));
   //console.log(startDate.current + '---' + endDate.current);
   const {signOut} = useAuth();

   useEffect(() => {
      const fetchData = async () => {
         await api.get(`/api/null`);
         const response2 = await api.get(`/api/groups/select`);
         const array2: IDadosProps[] = response2.data;
         array2.sort((a, b) => a.name.localeCompare(b.name));
         setGroups([{id: '0', name: ''}, ...array2]);
         //----------------------------------------------------------------------------
         const array3: IDadosProps[] = alocacoes;
         array3.sort((a, b) => a.name.localeCompare(b.name));
         setAlocacao([{id: '0', name: ''}, ...array3]);
         //----------------------------------------------------------------------------
      };
      fetchData().catch((error: Error | AxiosError) => {
         console.log(error);
         if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
               signOut();
            }
         }
      });
   }, []);

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
   };

   const handleChangeGroupAloc = async (
      aloc: React.ChangeEvent<HTMLSelectElement> | string,
      group: React.ChangeEvent<HTMLSelectElement> | string,
   ) => {
      // console.log(`-------`);
      // console.log(group);
      // console.log(aloc);

      if (aloc <= '1' || group === '0') {
         return;
      }
      try {
         const response = await api.post(`/api/prints/${group}/${aloc}`, {
            dataIni: `${startDate.current}T00:00:00.000Z`,
            dataFim: `${endDate.current}T00:00:00.000Z`,
         });
         console.log(response.data);
         setEfetividade(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Container>
         <ContentHeader title="Impressões" linecolor="#ff5100ff">
            <SelectInput
               options={alocacao}
               selectedid={'0'}
               onChange={e => {
                  e.preventDefault();
                  setAlocacaoSelected(e.target.value);
                  handleChangeGroupAloc(e.target.value, groupSelected);
               }}
            />
            <SelectInput
               options={groups}
               selectedid={'0'}
               onChange={e => {
                  e.preventDefault();
                  setGroupSelected(e.target.value);
                  handleChangeGroupAloc(alocacaoSelected, e.target.value);
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
         </ContentHeader>
         {/* //--------------------- AQUI COMECA A IMPRESSAO ---------------------------- */}
         <TTable>
            <TdCaptionTable>
               <p>Pronto Atendimento C.S. Feitoria</p>{' '}
               <p>
                  {parseInt(mesSelected)}/{anoSelected}
               </p>
            </TdCaptionTable>

            <TheadFirstTable>
               <TrFirstTable>
                  <TdFirstTableP>Profissional</TdFirstTableP>
                  <TdFirstTableC>CRM</TdFirstTableC>
                  <TdFirstTableH>Horas Trabalhadas</TdFirstTableH>
                  <TdFirstTableD>Datas</TdFirstTableD>
               </TrFirstTable>
            </TheadFirstTable>

            <TheadTable>
               {efetividade.map((item, index) => {
                  const stringTurnos = item.diasTurno
                     .map(dia => dia.replace(/[]/g, '')) // Remove parênteses
                     .sort()
                     .join(', ');
                  return (
                     <TrTable key={index}>
                        <TdLeftTable>{item.nome}</TdLeftTable>
                        <TdTable>{item.crm}</TdTable>
                        <TdTable>{item.totalHoras}Hs</TdTable>
                        <TdRightTable>{stringTurnos}</TdRightTable>
                     </TrTable>
                  );
               })}
               <TrTable>
                  <TdLeftTable> </TdLeftTable>
                  <TdTable> </TdTable>
                  <TdTable> </TdTable>
                  <TdLeftTable> . </TdLeftTable>
               </TrTable>
            </TheadTable>
            <TFood>
               <TDFood colSpan={2}>Total das Horas Profissionais</TDFood>
               <TDFood colSpan={1}>
                  {efetividade.reduce(
                     (total, profiss) => total + profiss.totalHoras,
                     0,
                  )}
                  Hs
               </TDFood>
               <TDFood colSpan={1}></TDFood>
            </TFood>
         </TTable>
      </Container>
   );
};

export default Printers;

// const diasTurno = ["07(N)", "03(N)", "05(D)", "01(D)", "05(D)"];
// const stringTurnos = diasTurno
//   .map((dia) => dia.replace(/[()]/g, '')) // Remove parênteses
//   .join(', ');
// console.log(`"stringTurnos": "${stringTurnos}"`);

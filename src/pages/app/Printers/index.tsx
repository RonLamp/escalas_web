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
   TrTable,
   TdFirstTableP,
   TdFirstTableC,
   TdFirstTableH,
   TdFirstTableD,
} from './styles';

import ContentHeader from '../../../components/ContentHeader';
import SelectInput from '../../../components/SelectInput';
import {months, years, alocacoes} from '../../../resources/configs';
import {useAuth} from '../../../hooks/auth';
import {api} from '../../../resources/api';
import dayjs from 'dayjs';
import {IDadosProps} from '../../../resources/interfaces';
import axios, {AxiosError} from 'axios';

const Printers: React.FC = () => {
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
   console.log(startDate.current + '---' + endDate.current);
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

   const handleChangeGroup = async (
      e: React.ChangeEvent<HTMLSelectElement>,
   ) => {
      if (e.target.value === '0') {
         setGroupSelected('0');
         return;
      }
   };

   const handleChangeAlocacoes = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === '0') {
         setAlocacaoSelected('0');
         return;
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
                  handleChangeAlocacoes(e);
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
               <TrTable>
                  <TdLeftTable>Dr. João das Candongas</TdLeftTable>
                  <TdTable>99.999</TdTable>
                  <TdTable>144Hs </TdTable>
                  <TdTable>6(N) 7(D) 8(N)</TdTable>
               </TrTable>{' '}
               <TrTable>
                  <TdLeftTable>Dr. João das Candongas</TdLeftTable>
                  <TdTable>99.999</TdTable>
                  <TdTable>144Hs </TdTable>
                  <TdTable>6(N) 7(D) 8(N)</TdTable>
               </TrTable>{' '}
               <TrTable>
                  <TdLeftTable>Dr. João das Candongas</TdLeftTable>
                  <TdTable>99.999</TdTable>
                  <TdTable>144Hs </TdTable>
                  <TdTable>6(N) 7(D) 8(N)</TdTable>
               </TrTable>
            </TheadTable>
            <tfoot>
               <p> Here</p>
            </tfoot>
         </TTable>
      </Container>
   );
};

export default Printers;

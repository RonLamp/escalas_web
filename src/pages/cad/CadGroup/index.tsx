import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
//import { NumericFormat } from "react-number-format";
import {useNavigate, useLocation} from 'react-router-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import SelectInput from '../../../components/SelectInput';
import {
   Container,
   ContentButton,
   ButtonState,
   MainForm,
   JustForm,
   DivForm,
   ButtonForm,
   InputForm,
   LabelForm,
   //NumberForm,
} from '../styles';
import ContentHeader from '../../../components/ContentHeader';
import {api} from '../../../resources/api';
import {IoMdTrash, IoMdAdd, IoMdCreate} from 'react-icons/io';
import {useAuth} from '../../../hooks/auth';

//-- tipagem e constantes para o select de Users ----------------------------
type IDadosProps = {
   id: string;
   name: string;
};

const createGroupFormSchema = z.object({
   name: z.string({
      required_error: 'Nome é obrigatório.',
      invalid_type_error: 'Nome deve ser uma string.',
   }),
});

type ICreateGroupFormData = z.infer<typeof createGroupFormSchema>;

const initValues: ICreateGroupFormData = {
   name: '',
};

const CadGroup: React.FC = () => {
   const {
      logged: {token},
      signOut,
   } = useAuth();
   const location = useLocation();
   const navigate = useNavigate();
   //dados são os customers que podem ser selecionados
   const [dados, setDados] = useState<IDadosProps[]>([]);
   const [idSelected, setIDSelected] = useState<string>('0');
   const [action, setAction] = useState('Incluir');
   const {
      register,
      handleSubmit,
      reset,
      //control,
      formState: {errors},
   } = useForm<ICreateGroupFormData>({
      resolver: zodResolver(createGroupFormSchema),
      defaultValues: initValues,
   });

   function refreshPage() {
      navigate(location.pathname);
   }

   useEffect(() => {
      const fetchData = async () => {
         const response = await api.get(`/api/groups/select`);
         const array: IDadosProps[] = response.data;
         array.sort((a, b) => a.name.localeCompare(b.name));
         setDados([{id: '0', name: ''}, ...array]);
      };
      fetchData().catch((error: any) => {
         console.log(error);
         if (error.response.status === 401) {
            signOut();
         }
      });
   }, [location.key]);

   async function submit(data: ICreateGroupFormData) {
      if (action === 'Incluir') {
         try {
            console.log(data);
            await api.post(`/api/group`, data);
            reset(initValues);
            refreshPage();
            alert('Especialidade incluído com sucesso!');
         } catch {
            (error: any) => {
               console.log(error);
               if (error.response.status === 401) {
                  signOut();
               }
            };
         }
      }
      if (action === 'Editar') {
         try {
            await api.patch(`/api/group/${idSelected}`, data);
            refreshPage();
            alert('Especialidade alterado com sucesso!');
         } catch {
            (error: any) => {
               console.log(error);
               if (error.response.status === 401) {
                  signOut();
               }
            };
         }
      }
      if (action === 'Deletar') {
         try {
            await api.delete(`/api/group/${idSelected}`);
            reset(initValues);
            refreshPage();
            alert('Especialidade excluído com sucesso!');
         } catch {
            (error: any) => {
               console.log(error);
               if (error.response.status === 401) {
                  signOut();
               }
            };
         }
      }
   }

   const handleAdd = () => {
      setAction('Incluir');
   };

   const handleEdit = () => {
      setAction('Editar');
   };

   const handleDelete = () => {
      setAction('Deletar');
   };

   const handleChange = async (idSelected: string) => {
      setIDSelected(idSelected);
      if (idSelected === '0') {
         setAction('Incluir');
         reset(initValues);
      } else {
         try {
            const response = await api.get(`/api/group/${idSelected}`);
            response.data.custom_price_cents =
               response.data.custom_price_cents / 100;
            reset(response.data);
            setAction('Editar');
         } catch {
            (error: any) => {
               console.log(error);
               if (error.response.status === 401) {
                  signOut();
               }
            };
         }
      }
   };

   return (
      <Container>
         <ContentHeader title="Escalas" linecolor="#ca590d">
            <SelectInput
               options={dados}
               selectedid="0"
               onChange={e => {
                  handleChange(e.target.value);
               }}
            />
            <ContentButton>
               <ButtonState
                  onClick={handleAdd}
                  id="idAdd"
                  title="Inserir uma especialidade."
                  disabled={idSelected !== '0'}
                  className={idSelected !== '0' ? 'disabled' : ''}>
                  <IoMdAdd size={20} />
               </ButtonState>
               <ButtonState
                  onClick={handleEdit}
                  id="idEdit"
                  title="Editar uma especialidade."
                  disabled={idSelected === '0'}
                  className={idSelected === '0' ? 'disabled' : ''}>
                  <IoMdCreate size={20} />
               </ButtonState>
               <ButtonState
                  onClick={handleDelete}
                  id="idDelete"
                  title="Excluir uma especialidade."
                  disabled={idSelected === '0'}
                  className={idSelected === '0' ? 'disabled' : ''}>
                  <IoMdTrash size={20} />
               </ButtonState>
            </ContentButton>
         </ContentHeader>

         <MainForm>
            <JustForm onSubmit={handleSubmit(submit)}>
               <DivForm>
                  <LabelForm htmlFor="name">Nome:</LabelForm>{' '}
                  <div>
                     <InputForm type="text" {...register('name')} />
                     {errors.name && <span>{errors.name.message}</span>}
                  </div>
               </DivForm>

               <ButtonForm type="submit">{action}</ButtonForm>
            </JustForm>
         </MainForm>
         {/* <div>{action}</div>
         <div>{`idSelected= ${idSelected}`}</div>
         <div>{`customer_id= ${customer_id}`}</div>
         <div>
            {JSON.stringify(dados.find((item) => item.id === idSelected))}
         </div> */}
      </Container>
   );
};

export default CadGroup;

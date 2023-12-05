import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useNavigate, useLocation} from 'react-router-dom';
import {useAuth} from '../../../hooks/auth';
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
   PaternFormatForm,
   TextAreaForm,
   InputDateForm,
   SelectForm,
} from '../styles';
import ContentHeader from '../../../components/ContentHeader';
import {api} from '../../../resources/api';
import {IoMdTrash, IoMdAdd, IoMdCreate} from 'react-icons/io';
import axios from 'axios';
import {alocacoes} from '../../../resources/configs';

//-- tipagem e constantes para o select de Users ----------------------------
type IDadosProps = {
   id: string;
   name: string;
};

const createProfissFormSchema = z.object({
   name: z.string().nonempty('O nome é obrigatório.'),
   born: z.string().transform(value => value.concat('T00:00:00.000Z')),
   alocacao: z.string().nonempty('A alocação é obrigatória.'),
   crm: z.string(),
   email: z
      .string()
      .nonempty('O email é obrigatório.')
      .email('Formato de e-mail inválido.')
      .toLowerCase(),
   phone: z.string().nonempty('O Fone é obrigatório.'),
   //-- nullables ---------------------
   cep: z.string().nullable(),
   street: z.string().nullable(),
   number: z.string().nullable(),
   complement: z.string().nullable(),
   neighborhood: z.string().nullable(),
   city: z.string().nullable(),
   state: z.string().nullable(),
   notes: z.string().nullable(),
});

type ICreateProfissFormData = z.infer<typeof createProfissFormSchema>;

const initValues: ICreateProfissFormData = {
   name: '',
   born: '1900-01-01T00:00:00.000Z',
   alocacao: '',
   crm: '',
   email: '',
   phone: '',
   cep: null,
   street: null,
   number: null,
   complement: null,
   neighborhood: null,
   city: null,
   state: null,
   notes: null,
};

const CadProfiss: React.FC = () => {
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
      setValue,
      setFocus,
      reset,
      control,
      formState: {errors},
   } = useForm<ICreateProfissFormData>({
      resolver: zodResolver(createProfissFormSchema),
      defaultValues: initValues,
   });

   function refreshPage() {
      navigate(location.pathname);
   }

   useEffect(() => {
      const fetchData = async () => {
         const response = await api.get(`/api/profisss/select`);
         const array: IDadosProps[] = response.data;
         array.sort((a, b) => a.name.localeCompare(b.name));
         setDados([{id: '0', name: ''}, ...array]);
      };
      fetchData().catch(console.error);
   }, [location.key]);

   async function submit(data: ICreateProfissFormData) {
      if (action === 'Incluir') {
         try {
            console.log(data);
            await api.post(`/api/profiss`, data);
            reset(initValues);
            refreshPage();
            alert('Profissional incluído com sucesso!');
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
            await api.patch(`/api/profiss/${idSelected}`, data);
            refreshPage();
            alert('Profissional alterado com sucesso!');
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
            await api.delete(`/api/profiss/${idSelected}`);
            reset(initValues);
            refreshPage();
            alert('Profissional excluído com sucesso!');
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
            const response = await api.get(`/api/profiss/${idSelected}`);
            response.data.born = response.data.born.substring(0, 10);
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

   const handleonBlurCep = async (e: React.FocusEvent<HTMLInputElement>) => {
      try {
         const response = await axios.get(
            `https://viacep.com.br/ws/${e.target.value}/json/`,
         );
         setValue('cep', response.data.cep);
         setValue('street', response.data.logradouro);
         setValue('complement', response.data.complemento);
         setValue('neighborhood', response.data.bairro);
         setValue('city', response.data.localidade);
         setValue('state', response.data.uf);
         setFocus('number');
      } catch (error) {}
   };

   return (
      <Container>
         <ContentHeader title="Profissional" linecolor="#ca590d">
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
                  title="Inserir um Customer."
                  disabled={idSelected !== '0'}
                  className={idSelected !== '0' ? 'disabled' : ''}>
                  <IoMdAdd size={20} />
               </ButtonState>
               <ButtonState
                  onClick={handleEdit}
                  id="idEdit"
                  title="Editar um Customer."
                  disabled={idSelected === '0'}
                  className={idSelected === '0' ? 'disabled' : ''}>
                  <IoMdCreate size={20} />
               </ButtonState>
               <ButtonState
                  onClick={handleDelete}
                  id="idDelete"
                  title="Excluir um customer."
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

               <DivForm>
                  <LabelForm htmlFor="born">Nascim.:</LabelForm>{' '}
                  <div>
                     <InputDateForm type="date" {...register('born')} />

                     {errors.born && <span>{errors.born.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="alocacao">Alocação:</LabelForm>{' '}
                  <div>
                     <SelectForm {...register('alocacao')}>
                        {alocacoes.map(item => (
                           <option key={item.id} value={item.id}>
                              {item.name}
                           </option>
                        ))}
                     </SelectForm>
                     {errors.alocacao && <span>{errors.alocacao.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="crm">CRM:</LabelForm>{' '}
                  <div>
                     <InputForm
                        type="text"
                        placeholder="000000/UF"
                        {...register('crm')}
                     />
                     {errors.crm && <span>{errors.crm.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="email">Email:</LabelForm>{' '}
                  <div>
                     <InputForm type="text" {...register('email')} />
                     {errors.email && <span>{errors.email.message}</span>}{' '}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="phone">Celular:</LabelForm>
                  <div>
                     <Controller
                        control={control}
                        name="phone"
                        defaultValue={''}
                        render={({field: {onChange, value}}) => (
                           <PaternFormatForm
                              format="(##)#####-####"
                              placeholder="(00)00000-0000"
                              name="name"
                              value={value}
                              inputMode="numeric"
                              onChange={onChange}
                           />
                        )}
                     />
                     {errors.phone && <span>{errors.phone.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="cep">CEP:</LabelForm>{' '}
                  <div>
                     <Controller
                        control={control}
                        name="cep"
                        defaultValue={''}
                        render={({field: {onChange, value}}) => (
                           <PaternFormatForm
                              format="#####-###"
                              placeholder="00000-000"
                              name="name"
                              value={value}
                              inputMode="numeric"
                              onChange={onChange}
                              onBlur={handleonBlurCep}
                           />
                        )}
                     />
                     {errors.cep && <span>{errors.cep.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="street">Rua:</LabelForm>
                  <div>
                     <InputForm type="text" {...register('street')} />
                     {errors.street && <span>{errors.street.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="number">Número:</LabelForm>
                  <div>
                     <InputForm
                        type="number"
                        inputMode="numeric"
                        {...register('number')}
                     />
                     {errors.number && <span>{errors.number.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="complement">Compl:</LabelForm>
                  <div>
                     <InputForm type="text" {...register('complement')} />
                     {errors.complement && (
                        <span>{errors.complement.message}</span>
                     )}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="neighborhood">Bairro:</LabelForm>
                  <div>
                     <InputForm type="text" {...register('neighborhood')} />
                     {errors.neighborhood && (
                        <span>{errors.neighborhood.message}</span>
                     )}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="city">Cidade:</LabelForm>
                  <div>
                     <InputForm type="text" {...register('city')} />
                     {errors.city && <span>{errors.city.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="state">Estado:</LabelForm>
                  <div>
                     <InputForm type="text" {...register('state')} />
                     {errors.state && <span>{errors.state.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="notes">Notas:</LabelForm>
                  <div>
                     <TextAreaForm
                        rows={8}
                        cols={30}
                        placeholder="Coloque as notas aqui..."
                        {...register('notes')}
                     />
                     {errors.notes && <span>{errors.notes.message}</span>}
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

export default CadProfiss;

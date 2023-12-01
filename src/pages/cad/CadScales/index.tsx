import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//import { NumericFormat } from "react-number-format";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "../../../components/SelectInput";
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
   SelectForm
} from "../styles";
import ContentHeader from "../../../components/ContentHeader";
import { api } from "../../../resources/api";
import { IoMdTrash, IoMdAdd, IoMdCreate } from "react-icons/io";
import { useAuth } from "../../../hooks/auth";

//-- tipagem e constantes para o select de Users ----------------------------
type IDadosProps = {
   id: string;
   name: string;
}

const createScaleFormSchema = z.object({
   name: z.string({
      required_error: "Nome é obrigatório.",
      invalid_type_error: "Nome deve ser uma string.",
   }),
   start: z.string({
      required_error: "Início é obrigatório.",
      invalid_type_error: "Início deve ser uma data.",
   }),
   end: z.string({
      required_error: "Fim é obrigatório.",
      invalid_type_error: "Fim deve ser uma data.",
   }),
   group_Id: z.string({
      required_error: "Grupo é obrigatório.",
      invalid_type_error: "Grupo deve ser uma string.",
   }).uuid(),
});

type ICreateScaleFormData = z.infer<typeof createScaleFormSchema>;

const initValues: ICreateScaleFormData = {
   name: "",
   start: "", //new Date(),
   end: "", //new Date(),
   group_Id: "0",
};

const CadScale: React.FC = () => {
   const { signOut } = useAuth();
   const location = useLocation();
   const navigate = useNavigate();
   //dados são os customers que podem ser selecionados
   const [dados, setDados] = useState<IDadosProps[]>([]);
   const [idSelected, setIDSelected] = useState<string>("0");
   const [groupIds, setGroupIds] = useState<IDadosProps[]>([]);
   const [action, setAction] = useState("Incluir");
   const {
      register,
      handleSubmit,
      reset,
      //control,
      formState: { errors },
   } = useForm<ICreateScaleFormData>({
      resolver: zodResolver(createScaleFormSchema),
      defaultValues: initValues,
   });

   function refreshPage() {
      navigate(location.pathname);
   }

   useEffect(() => {
      const fetchData = async () => {
         const response = await api.get(`/api/scales/select`);
         const array: IDadosProps[] = response.data;
         array.sort((a, b) => a.name.localeCompare(b.name));
         setDados([{ id: "0", name: "" }, ...array]);

         const response2 = await api.get(`/api/groups/select`);
         const array2: IDadosProps[] = response2.data;
         array2.sort((a, b) => a.name.localeCompare(b.name));
         setGroupIds([{ id: "0", name: "" }, ...array2]);
      };
      fetchData().catch((error: any) => {
         console.log(error);
         if (error.response.status === 401) {
            signOut();
         }
      })


   }, [location.key]);

   async function submit(data: ICreateScaleFormData) {
      console.log(data);
      // transformar start e end de time para datetime
      data.start = "2021-01-01T" + data.start + ":00Z";
      data.end = "2021-01-01T" + data.end + ":00Z";
      console.log(data);
      if (action === "Incluir") {
         try {
            await api.post(`/api/scale`, data);
            reset(initValues);
            refreshPage();
            alert('Especialidade incluído com sucesso!');
         } catch {
            ((error: any) => {
               console.log(error);
               if (error.response.status === 401) {
                  signOut();
               }
            })
         }
      }
      if (action === "Editar") {
         try {
            await api.patch(`/api/scale/${idSelected}`, data);
            refreshPage();
            alert('Especialidade alterado com sucesso!');
         } catch {
            ((error: any) => {
               console.log(error);
               if (error.response.status === 401) {
                  signOut();
               }
            })
         }
      }
      if (action === "Deletar") {
         try {
            await api.delete(`/api/scale/${idSelected}`);
            reset(initValues);
            refreshPage();
            alert('Especialidade excluído com sucesso!');
         } catch {
            ((error: any) => {
               console.log(error);
               if (error.response.status === 401) {
                  signOut();
               }
            })
         }
      }
   }

   const handleAdd = () => {
      setAction("Incluir");
   };

   const handleEdit = () => {
      setAction("Editar");
   };

   const handleDelete = () => {
      setAction("Deletar");
   };

   const handleChange = async (idSelected: string) => {
      setIDSelected(idSelected);
      if (idSelected === "0") {
         setAction("Incluir");
         reset(initValues);
      } else {
         try {
            const response = await api.get(`/api/scale/${idSelected}`);
            // transformação de start de datetime para time
            response.data.start = response.data.start.substring(11, 16);
            response.data.end = response.data.end.substring(11, 16);
            reset(response.data);
            setAction("Editar");
         } catch {
            ((error: any) => {
               console.log(error);
               if (error.response.status === 401) {
                  signOut();
               }
            })
         }

      }
   };

   return (
      <Container>
         <ContentHeader title="Horários" linecolor="#ca590d">
            <SelectInput
               options={dados}
               selectedid="0"
               onChange={(e) => {
                  handleChange(e.target.value);
               }}
            />
            <ContentButton>
               <ButtonState
                  onClick={handleAdd}
                  id="idAdd"
                  title="Inserir uma especialidade."
                  disabled={idSelected !== "0"}
                  className={idSelected !== "0" ? "disabled" : ""}
               >
                  <IoMdAdd size={20} />
               </ButtonState>
               <ButtonState
                  onClick={handleEdit}
                  id="idEdit"
                  title="Editar uma especialidade."
                  disabled={idSelected === "0"}
                  className={idSelected === "0" ? "disabled" : ""}
               >
                  <IoMdCreate size={20} />
               </ButtonState>
               <ButtonState
                  onClick={handleDelete}
                  id="idDelete"
                  title="Excluir uma especialidade."
                  disabled={idSelected === "0"}
                  className={idSelected === "0" ? "disabled" : ""}
               >
                  <IoMdTrash size={20} />
               </ButtonState>
            </ContentButton>
         </ContentHeader>

         <MainForm>
            <JustForm onSubmit={handleSubmit(submit)}>

               <DivForm>
                  <LabelForm htmlFor="group_Id">Grupo:</LabelForm>{" "}
                  <div>
                     <SelectForm {...register("group_Id")}>
                        {groupIds.map((item) => (
                           <option key={item.id} value={item.id}>
                              {item.name}
                           </option>
                        ))}
                     </SelectForm>
                     {errors.group_Id && <span>{errors.group_Id.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="name">Nome:</LabelForm>{" "}
                  <div>
                     <InputForm type="text" {...register("name")} />
                     {errors.name && <span>{errors.name.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="start">Hora Inicial:</LabelForm>{" "}
                  <div>
                     <InputForm type="time" {...register("start")} />
                     {errors.start && <span>{errors.start.message}</span>}
                  </div>
               </DivForm>

               <DivForm>
                  <LabelForm htmlFor="end">Hora Final:</LabelForm>{" "}
                  <div>
                     <InputForm type="time" {...register("end")} />
                     {errors.end && <span>{errors.end.message}</span>}
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

export default CadScale;
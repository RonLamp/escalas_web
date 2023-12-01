import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../../components/SelectInput";
import {
   Container,
   DivForm,
   ButtonForm,
   MultiSelectForm,
} from "../styles";
import ContentHeader from "../../../components/ContentHeader";
import { api } from "../../../resources/api";
import { useAuth } from "../../../hooks/auth";
import { IDadosProps } from "../../../resources/interfaces";

//-- tipagem e constantes para o select de Users ----------------------------
/* type IDadosProps = {
   id: string;
   name: string;
} */
interface IOptionsProps {
   label: string;
   value: string;
}
interface IRelProfGroup {
   id: string;
   color: string;
   profiss_Id: string;
   profiss_name: string;
}

const CadProfGroup: React.FC = () => {
   const { signOut } = useAuth();
   const navigate = useNavigate();
   // são os profissionais do customer 
   const [dados, setDados] = useState<IDadosProps[]>([]);
   const [idSelected, setIdSelected] = useState<string>("0");

   // options são as especialidades do customer disponiveis para uso
   const [options, setOptions] = useState<IOptionsProps[]>([]); //Multi especialidades
   // selected são as especialidades do profiss selecionado
   const [profisssSelected, setProfisssSelected] = useState<IOptionsProps[]>([]); //Multi groups selecionadas
   const [profisssTSelected, setProfisssTSelected] = useState<IRelProfGroup[]>([]); //Multi groups selecionadas Totais

   useEffect(() => {
      const fetchData = async () => {
         //--- Carrega os profissionais disponiveis no Customer ------------------------
         const response = await api.get(`/api/groups/select`);
         const array: IDadosProps[] = response.data;
         array.sort((a, b) => a.name.localeCompare(b.name));
         setDados([{ id: "0", name: "" }, ...array]);
         //----
         //console.log([{ id: "0", name: "" }, ...array]);
         //--- Carrega as especialidades disponiveis no Customer ------------------------
         const response2 = await api.get(`/api/profisss/select`);
         const array2: IDadosProps[] = response2.data;
         const arrayTransf: IOptionsProps[] = array2.map(item => ({
            label: item.name,
            value: item.id,
         }));
         setOptions(arrayTransf);
         //console.log("options ---------------------------");
         //console.log(arrayTransf);
      };
      fetchData().catch((error) => {
         console.log(`error here: ${error}`);
         if (error.response.status === 401) {
            signOut();
         }
      });
   }, []);

   const handleGroupChange = async (idSelected: string) => {
      setIdSelected(idSelected);
      if (idSelected === "0") {
         // nenhum grupo selecionado
         setProfisssSelected([]);
         setProfisssTSelected([]);
      } else {
         try {
            //--- Carregar o specsIni com as especialidades do profiss selecionado ------------------------
            const response = await api.get(`/api/profsgroup/group/${idSelected}`);
            const array: IRelProfGroup[] = response.data;
            console.log("array ---------------------------");
            console.log(response.data);

            const arrayTransf: IOptionsProps[] = array.map((item) => ({
               value: item.profiss_Id,
               label: item.profiss_name,
            }));
            setProfisssSelected(arrayTransf);
            setProfisssTSelected(array);
         } catch (error: any) {
            console.log(error);
            if (error.response.status === 401) {
               signOut();
            } else { alert(`Erro no servidor: Tente novamente mais tarde.`) }
         }
      }
   };

   const handleProfissChange = async (Profisss: IOptionsProps[]) => {

      setProfisssSelected(Profisss);
      const newProfisssTSelected: IRelProfGroup[] = Profisss.map(item => {
         const profissT = profisssTSelected.find(profissT => profissT.profiss_Id === item.value);
         if (profissT) {
            return profissT;
         } else {
            return {
               id: "",
               color: "",
               profiss_Id: item.value,
               profiss_name: item.label,
            };
         }
      });
      setProfisssTSelected(newProfisssTSelected);
      //console.log("specsSelected ---------------------------");
      //console.log(Specs);
      //console.log("specsTSelected ---------------------------");
      //console.log(newSpecsTSelected);
   };

   const handleColor = (value: string, index: number) => {
      const newProfisssTSelected = [...profisssTSelected];
      newProfisssTSelected[index].color = value;
      setProfisssTSelected(newProfisssTSelected);
   };


   function refreshPage() {
      navigate(location.pathname);
   }


   const handleSubmit = async () => {
      try {
         await api.post(`/api/profsgroup/${idSelected}`, profisssTSelected);
         //const response = await api.post(`/api/relsprofspecs/${idSelected}`, specsTSelected);
         //console.log(response.data);
         alert("Dados salvos com sucesso!");
         setIdSelected("0");
         setProfisssTSelected([]);
         setProfisssSelected([]);
         refreshPage();
      } catch (error: any) {
         console.log(error);
         if (error.response.status === 401) {
            signOut();
         } else { alert(`Erro no servidor: Tente novamente mais tarde.`) }
      }
   };


   return (
      <Container>
         <ContentHeader title="Profissionais por Grupo" linecolor="#ca590d">
            <SelectInput
               options={dados}
               selectedid="0"
               onChange={(e) => {
                  e.preventDefault();
                  handleGroupChange(e.target.value);
               }}
            />
         </ContentHeader>
         <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
         }}>
            <MultiSelectForm
               options={options}
               value={profisssSelected}
               onChange={handleProfissChange}
               labelledBy="Selecione os profissionais do grupo"
            />
            <div >
               <form
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "100%",
                     height: "100%",
                  }}
                  onSubmit={(e) => {
                     e.preventDefault();
                     //console.log("Button Submit acionado");
                  }}
               >
                  <div style={{
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "space-around",
                     marginTop: "25px",
                     marginBottom: "10px",
                  }} >
                     <h4 style={{ width: "140px" }}>Profissional</h4>
                     <h4 style={{ width: "60px" }}>Cor</h4>
                  </div>
                  {
                     profisssTSelected.map((item, index) => {
                        //if (item.default) { setSelectedRadio(index.toString().padStart(2, "0")) };
                        return (
                           <DivForm
                              key={index}
                              style={{
                                 marginTop: "15px",
                              }}
                           >
                              <p
                                 style={{
                                    marginRight: "10px",
                                    width: "110px",
                                 }}
                              >{item.profiss_name}</p>


                              <input
                                 type="color"
                                 value={item.color}
                                 onChange={(e) => {
                                    handleColor(e.target.value, index);
                                 }}
                                 style={{
                                    width: "100px",
                                    height: "30px",
                                    marginLeft: "10px",
                                 }}
                              />
                           </DivForm>)
                     }
                     )}
                  <ButtonForm
                     type="submit"
                     style={{
                        marginTop: "20px",
                        width: "100px",
                     }}
                     onClick={handleSubmit}
                  >Salvar</ButtonForm>
               </form>
            </div>
         </div>
      </Container >
   );
};

export default CadProfGroup;









// response 200 = OK
// response 204 = Not Found
//-------------------------------------------------
// response 400 = Bad Request
// response 401 = Unauthorized
// response 500 = Internal Server Error
//            if (response.status === 200) {
// response data encontrada => editar
//console.log(`response.data.speciality.id= ${response.data.speciality.id}`);


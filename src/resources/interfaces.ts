export interface IDadosProps {
   id: string;
   name: string;
}

export interface IDistribProps {
   id: string;
   data: Date;
   dia: string;
   mes: string;
   ano: string;
   obs?: string | null;
   color?: string;
   profiss_id?: string;
   profiss_name?: string;
   scale_id: string;
   scale_name: string;
}

export interface IProfissGroupProps {
   profiss_Id: string;
   profiss_name: string;
   color: string;
   obs?: string;
}

// export interface ITaskScaleProps {
//    profiss_Id: string;
//    profiss_name: string;
//    color: string;
//    obs?: string;

//    dia: string;
//    mes: string;
//    data: Date;
//    scale_id: string;
//    scale_name: string;
// }

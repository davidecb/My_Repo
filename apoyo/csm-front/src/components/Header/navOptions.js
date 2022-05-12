import { HiHome, HiOutlineLogout } from 'react-icons/hi';
import { GoGraph } from 'react-icons/go';
import { MdEventNote } from 'react-icons/md';
import { IoSettingsOutline, IoDocumentText } from 'react-icons/io5';
import { FaFileUpload, FaFileInvoiceDollar } from 'react-icons/fa';

const navOptions = [  
    {
        role: "CEO monitor manager financial admin",
        name: "Inicio",
        Icon: HiHome,
        urlPath: "/main/home"
    },  
    {
        role: "CEO admin manager",
        name: "Cargar Datos",
        Icon: FaFileUpload,
        urlPath: "/main/upload-data"
    },    
    {
        role: "CEO monitor manager financial admin",
        name: "Gestión",
        Icon: GoGraph,
        urlPath: "/main/management"
    },
    {
        role: "CEO manager financial admin",
        name: "Notas",
        Icon: MdEventNote,
        urlPath: "/main/notes"
    },
    {
        role: "admin",
        name: "Mantenimiento",
        Icon: IoSettingsOutline,
        urlPath: "/main/maintenance"
    },
    {
        role: "admin",
        name: "Reportes",
        Icon: IoDocumentText,
        urlPath: "/main/reports/goals"
    },
    {
        role: "admin",
        name: "Financiero",
        Icon: FaFileInvoiceDollar,
        urlPath: "/main/financial"
    },
    {
        role: "CEO monitor manager financial admin maintenance",
        name: "Salir",
        Icon: HiOutlineLogout,
        urlPath: "/"
    }
];

export default navOptions;

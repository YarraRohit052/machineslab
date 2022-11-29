import "./ExpTable.css";
import {Table, Column, Card} from "react-rainbow-components";


 const ExpTable=(props)=>{

    
    return(
        <div className="exp__table__container">
            <Card>
            <Table data={props.datatable} keyField="sno">
            <Column header="S.No" field="sno" />
            <Column header="Voltage (V)" field="voltage"/>
            <Column header="Current (A)" field="current"/>
            <Column header="Armature Current (Am)" field="armaturecurrent"/>
            <Column header="Speed (RPM)" field="speed" />
            <Column header="S1" field="s1" />
            <Column header="S2" field="s2" />
            <Column header="S1-S2" field="s1_s2" />
            <Column header="Torque (Nm)" field="torque" />
            <Column header="Input Power (W)" field="inputpower" />
            <Column header="Output Power (W)" field="outputpower" />
            <Column header="Efficiency (%)" field="efficiency" />
            <Column header="Delete Row" field="deleterow"/>
            </Table>
            </Card>
        </div>
    );
};

export default ExpTable;
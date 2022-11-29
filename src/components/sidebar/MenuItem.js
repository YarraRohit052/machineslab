import "./MenuItem.css";

const MenuItem=(props)=>{
    const menuItemid=props.id;
    const expname=props.ename;

    const menuItemClickHandler=()=>{
        //props.expclick(props.key);
        //console.log(menuItemid);
        props.expclick(menuItemid, expname);
        props.drawercloser();
    }
    return(
        <div className="menu__item" key={props.id} onClick={menuItemClickHandler}>
            <p className="menu__item__text">{props.ename}</p>
        </div>
    );
}

export default MenuItem;
import React from "react";
import { Link } from '@mui/material';
import {TemplateCard} from "../Template/Template.js"
import { useNavigate } from "react-router-dom";

const Card = (data) => {
    const { id } = data;

    const navigate = useNavigate();
    const handleOnCardClick = () => {
        navigate(`/city/${id}`);
    }

    return (
        <Link to={`/city/${id}`} onClick={handleOnCardClick} underline="none">
            <div>
                <TemplateCard data={data} />
            </div>
        </Link>
    );
}

export default Card;   
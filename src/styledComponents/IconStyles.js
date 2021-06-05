import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaTrash, FaPencilAlt, FaMapMarkerAlt} from "react-icons/fa";
import { AiOutlineComment } from 'react-icons/ai';
import { BiRepost } from 'react-icons/bi'

export const CommentIcon = styled(AiOutlineComment)`
font-size: 22px;
color: #FFF;
cursor: pointer;
`;

export const HeartIconFill = styled(FaHeart)`
font-size: 21px;
color: #AC0000;
cursor: pointer;
`;

export const HeartIconEmpty = styled(FiHeart)`
font-size: 21px;
color: #FFF;
cursor: pointer;
`;

export const TrashIcon = styled(FaTrash)`
color: #FFF;
width: 14px;
height: 14px;
margin-left: 10px;
cursor: pointer;
`;

export const PencilIcon = styled(FaPencilAlt)`
    color: #FFF;
    width: 14px;
    height: 14px;
    margin-left: 15px;
    cursor: pointer;
`

export const MapMarkerIcon = styled(FaMapMarkerAlt)`
    color: #FFF;
    font-size:16px;
    margin-left:10px;
    cursor: pointer;
`

export const RespostIcon = styled(BiRepost)`
font-size: 23px;
color: #FFF;
cursor: pointer;
`
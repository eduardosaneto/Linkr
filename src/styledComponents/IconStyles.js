import styled from "styled-components";
import { AiOutlineComment } from 'react-icons/ai';
import { BiRepost } from 'react-icons/bi'
import { FaHeart, FaTrash, FaPencilAlt, FaMapMarkerAlt, FaHashtag} from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { GoPrimitiveDot } from 'react-icons/go'
import { IoPaperPlaneOutline } from 'react-icons/io5'

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
`;

export const PlaneIcon = styled(IoPaperPlaneOutline)`
color: #FFF;
font-size: 16px;
cursor: pointer;
`;

export const DotIcon = styled(GoPrimitiveDot)`
padding: 4px 4px 0 4px;
cursor: pointer;
`;

export const HashtagIcon = styled(FaHashtag)`
color: #FFF;
font-size: 19px;
line-height: 23px;
margin-left: 10px;
position: absolute;
top: 8px;
left: 17px;
cursor: pointer;
`;
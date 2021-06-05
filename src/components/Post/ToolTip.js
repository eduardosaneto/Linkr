import Tippy from "@tippyjs/react";
import styled from 'styled-components'

export default function ToolTip({like, likeQuantity, peopleThatLiked}) {

    return(
        <Tooltip
        content={
          peopleThatLiked.length > 0 ? (
            <span>
              {peopleThatLiked.map((name, i) => {
                if (i < 2) {
                  if (i === 0)
                    return (
                      <p>{like === 1 ? "Você" : name["user.username"]}</p>
                    );
                  if (i === 1)
                    return (
                      <p>
                        {peopleThatLiked.length === 2 ? `\u00A0 e ` : ","}{" "}
                        {name["user.username"]}{" "}
                      </p>
                    );
                }
              })}
              <p>
                {" "}
                {"\u00A0"}
                {`${
                  peopleThatLiked.length >= 4
                    ? `e outras ${
                        peopleThatLiked.length - 2
                      } pessoas curtiram este post`
                    : `${
                        peopleThatLiked.length === 3
                          ? `e mais uma pessoa curtiram este post`
                          : `${
                              peopleThatLiked.length === 2
                                ? `curtiram este post`
                                : `${
                                    peopleThatLiked.length === 1
                                      ? `curtiu este post`
                                      : ""
                                  }`
                            }`
                      }`
                }`}
              </p>
            </span>
          ) : (
            "Nenhuma curtida até o momento"
          )
        }
        interactive={true}
        placement='bottom'
        arrow={true}>
        <p>
          {likeQuantity} {likeQuantity === 1 ? "like" : "likes"}
        </p>
      </Tooltip>
    )
}

const Tooltip = styled(Tippy)`
background: #ebebeb !important;
font-weight: 700 !important;
font-size: 12px !important;
line-height: 14px !important;
color: #505050 !important;
display: flex !important;

span {
  width: 100%;
  display: flex;
}

p {
  color: #505050 !important;
}

.tippy-arrow {
  color: #ebebeb !important;
}
`;
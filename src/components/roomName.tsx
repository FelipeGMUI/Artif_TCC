import React from "react";
import '../styles/roomName.scss'

type RoomNameProps = {
    tittle: string;
}

export default function RoomName(props: RoomNameProps) {

    return (
        <div className = "room-tittle">
            <span>Sala: {props.tittle} </span>
        </div>
    )

}
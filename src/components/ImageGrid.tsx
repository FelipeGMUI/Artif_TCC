import React from "react";
import { useParams } from "react-router-dom";
import useGrid from "../hooks/useGrid";

import '../styles/imageGrid.scss';

type paramsProps = {
  id: string
}
const ImageGrid = ({ setSelectedImage }: any) => {
  const params = useParams<paramsProps>();

  const { roomImage }: any = useGrid();
  console.log(roomImage)

  return (
    <div className="image-container">
      {roomImage && roomImage.map((doc: any) => (
        <div className="img-wrap" key={doc.id}
          onClick={() => setSelectedImage(doc.url)}>
          <img src={doc.url} alt="artes" />
          <div className="overlay-image">
            <span className="author-image">Criado por: {doc.authorName}</span>
          </div>
        </div>
      ))}
    </div>
  )

}

export default ImageGrid;
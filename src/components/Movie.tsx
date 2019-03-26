import React from "react";

export class Movie extends React.Component<{id: string}> {
  render() {
    const { id } = this.props;
    return (
      <iframe
        frameBorder="0"
        allowFullScreen={true}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube video player"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=1`}
      />
    );
  }
}


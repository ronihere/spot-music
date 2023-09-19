import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
export default function Nav({ libraryStatus, setLibraryStatus }) {
  let libraryVisibilityHandler = () => {
    setLibraryStatus(!libraryStatus);
  }
  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={libraryVisibilityHandler}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}

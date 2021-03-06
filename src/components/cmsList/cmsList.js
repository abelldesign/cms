import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import CMSLayout from '../cmsLayout';
import CreateContentForm from '../createContentForm';
import CMSListItem from '../cmsListItem';

const CMSList = ({
  submitFailed,
  nameErrors,
  items,
  firebase,
  clearItemAction,
  itemNameLowercase,
  itemNameLowercasePlural,
  itemNameUppercase,
  itemNameUppercasePlural,
  itemFirebaseUrl,
}) => {
  let itemList;

  if (!isLoaded(items)) {
    itemList = 'Loading';
  } else if (isEmpty(items)) {
    itemList = `Please create a new ${itemNameLowercase}`;
  } else {
    itemList = Object.keys(items).map((key, id) => (
      <CMSListItem
        key={key}
        name={items[id].name}
        itemKey={items[id].key}
        type={itemNameLowercasePlural}
      />
    ));
  }

  return (
    <CMSLayout>
      <article>
        <h1>{itemNameUppercasePlural}</h1>

        <div>
          <h2>Create {itemNameUppercase}</h2>
          <CreateContentForm
            firebase={firebase}
            clearAction={clearItemAction}
            itemUrl={itemFirebaseUrl}
            submitFailed={submitFailed}
            nameErrors={nameErrors}
            itemName={itemNameUppercase}
          />
        </div>

        <div>
          <h2>Edit {itemNameUppercasePlural}</h2>
          { itemList }
        </div>
      </article>
    </CMSLayout>
  );
};

export default CMSList;


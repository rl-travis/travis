import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  EditorState,
  Modifier,
} from "draft-js";

// Стратегия поиска ссылок в содержимом
export const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
  }, callback);
};

// Компонент для отображения ссылок
export const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: "#3886e4" }}>
      {props.children}
    </a>
  );
};

// Декоратор для обработки ссылок
export const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

// Функция для добавления ссылки
export const addLink = (editorState: EditorState, url: string): EditorState => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url });

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const contentStateWithLink = Modifier.applyEntity(
    contentStateWithEntity,
    selectionState,
    entityKey,
  );

  const newEditorState = EditorState.push(
    editorState,
    contentStateWithLink,
    "apply-entity",
  );

  return EditorState.forceSelection(newEditorState, selectionState);
};

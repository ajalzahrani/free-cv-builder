const Passable1: React.FC<{ id: number; name: string }> = ({ id, name }) => {
  return (
    <div>
      <h4>passable1</h4>
      <p>
        {id} - {name}
      </p>
    </div>
  );
};

const Passable2: React.FC<{ id: number; name: string }> = ({ id, name }) => {
  return (
    <div>
      <h4>passable2</h4>
      <p>
        {id} - {name}
      </p>
    </div>
  );
};

const Passable3: React.FC<{ id: number; name: string }> = ({ id, name }) => {
  return (
    <div>
      <h4>passable3</h4>
      <p>
        {id} - {name}
      </p>
    </div>
  );
};

export type passableType = {
  id: number;
  name: string;
  Passable: React.FC<{ id: number; name: string }>;
};

const Builder: React.FC<passableType> = ({ id, name, Passable }) => {
  return (
    <div>
      <h1>Builder</h1>
      <p>{id}</p>
      <p>{name}</p>
      <Passable id={id} name={name} />
    </div>
  );
};

const App2 = () => {
  const passablearray: passableType[] = [
    { id: 1, name: 'a', Passable: Passable1 },
    { id: 2, name: 'b', Passable: Passable2 },
    { id: 3, name: 'c', Passable: Passable3 },
  ];

  return (
    <div>
      <Builder id={passablearray[2].id} name={passablearray[2].name} Passable={passablearray[2].Passable} />
    </div>
  );
};

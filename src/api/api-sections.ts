import { sectionType } from '../components/Types';

export const callFindAll = async (URL: string, section: sectionType) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1 }),
    });

    if (response.ok) {
      let data = await response.json();

      return data;
    } else {
      // Handle retrive data failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Retrieve data failed. Please check again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error. Please check again.');
  }
};

export const callCreate = async (URL: string, section: sectionType | Partial<sectionType>) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ section, userId: 1 }),
    });

    if (response.ok) {
      alert('Create data successfully');
    } else {
      // Handle create failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Create data failed. Please check again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error. Please check again.');
  }
};

export const callUpdate = async (URL: string, section: sectionType) => {
  try {
    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ section, userId: 1 }),
    });

    if (response.ok) {
      alert('Update data successfully');
    } else {
      // Handle update failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Update data failed. Please check again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error. Please check again.');
  }
};

export const callDelete = async (URL: string, id: number) => {
  try {
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, userId: 1 }),
    });

    if (response.ok) {
      alert('Delete data successfully');
    } else {
      // Handle delete failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Delete data failed. Please check again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error. Please check again.');
  }
};

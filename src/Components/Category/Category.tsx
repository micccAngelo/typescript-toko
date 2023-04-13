import { useEffect, useState } from 'react';
import GetCategories from '../../API Services/GetCategories';
import { ListGroup, Card } from 'react-bootstrap';
import Loadings from '../../Reusable/Loadings';
import './Category.css';

interface CategoryProps {
  handleCategorySelect: (category: string) => void;
  selectedCategory?: string;
}

function Category({ handleCategorySelect, selectedCategory }: CategoryProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: string[] = await GetCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  
  return (
    <div className="row" style={{ paddingTop: "50px", left: 0 }}>
      <div className="col-md-4">
        {!loading && (
          <Card className='card-category'>
            <Card.Header className='card-header'>
              <Card.Title className='category-title-header category-sidebar'>Categories</Card.Title>
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group category-list no-border" >
              {categories.map((category: string) => (
                <ListGroup.Item 
                  key={category} 
                  action 
                  active={category === selectedCategory}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}
        {loading && <Loadings variant="danger" />}
      </div>
    </div>
  );
}

export default Category;

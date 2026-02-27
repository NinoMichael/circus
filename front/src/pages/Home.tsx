import Button from '@mui/material/Button';
import SendIcon from "@mui/icons-material/Send";

const Home = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">
                Bienvenue
            </h1>

            <Button 
                className='mt-8! bg-primary!'
                endIcon={<SendIcon />}
            >
                Hello world</Button>
        </div>
    );
}

export default Home
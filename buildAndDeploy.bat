call npm run build
call npm run export
robocopy ./out \\raspberrypi\www\movie-list /MIR /Z
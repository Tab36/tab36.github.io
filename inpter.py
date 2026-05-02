#Brainfuck Interpreter

#Imports
import tkinter as tk
from queue import Queue as queue, Empty
from tkinter import font, filedialog as fd

#Resets stuff
started = False
paused = False
que = queue(maxsize=500)
inchar = queue(maxsize=100)
fps = 60
memory = [] + [0] *3000
cursor = 0
bfcode = ""

#Interpreter
def brainfuck(index):
    #Globals
    global started, paused, que, inchar, fps, memory, cursor, bfcode

    #Stops at the end of code
    if index >= len(bfcode) or not started:
        if not edshow:
            pane.add(editor, before=console)
            root.event_generate("<Configure>")
        return
    i = index
    command = bfcode[i]
    cont = True
    
    #Run if not paused
    if not paused:

        #Moves cursor
        if command == ">":
            cursor += 1
            if cursor >= len(memory): cursor = 0
        elif command == "<":
            cursor -= 1
            if cursor < 0: cursor = len(memory)-1

        #Changes Memory
        elif command == "+":
            memory[cursor] = (memory[cursor] + 1) % 256
        elif command == "-":
            memory[cursor] = (memory[cursor] - 1) % 256

        #Input
        elif command == ",":
            try:
                memory[cursor] = ord(inchar.get_nowait()) % 256
            except:
                #Runs the same code until recieving an input
                cont = False

        #Output
        elif command == ".":
            try:
                que.put_nowait(chr(memory[cursor]))
            except:
                #Runs the same code until que has space
                cont = False

        #Loop
        elif command == "[" and memory[cursor] == 0:
            depth = 1
            while depth > 0:
                i += 1
                if bfcode[i] == "[":
                    depth += 1
                elif bfcode[i] == "]":
                    depth -= 1

        elif command == "]":
            if memory[cursor] != 0:
                depth = 1
                while depth > 0:
                    i -= 1
                    if bfcode[i] == "[":
                        depth -= 1
                    elif bfcode[i] == "]":
                        depth += 1
    
    #Continues with desired fps and optional advancement
    root.after(round(1000/fps), lambda : brainfuck(i+(cont and not paused)))

#Creates main window
root = tk.Tk()
root.title("UnFucktion: A Brainfuck Interpreter")
root.geometry(f"{round(root.winfo_screenwidth()*0.5)}x{round(root.winfo_screenwidth()*0.3)}")
root.config(background="black")

#Gets input
def onkey(e):
    global started
    if e.char and started:
        try:
            inchar.put_nowait(e.char)
        except:
            pass
root.bind("<Key>", onkey)

#Detects resize and resizes accordingly
def onresize(e):
    if e.widget == root:
        pane.config(height=max(1, root.winfo_height()-120))
        pane.config(width=max(1, root.winfo_width()*0.8))
        pane.paneconfig(editor, height=max(1, (root.winfo_height()-120)/2))
        widthslide.set("800")
root.bind("<Configure>", onresize)

#Adds settings
def optadd(setting, value):
    root.option_add("*" + setting, value)

optadd("Font", ("Arial", 12))
optadd("Foreground", "white")
optadd("Background", "black")
optadd("activeBackground", "#333")
optadd("activeForeground", "white")
optadd("relief", "groove")
optadd("anchor", "nw")
_font = font.Font(family="Arial", size=15)

#Creates menus
menu = tk.Frame(root, height=50, pady=10)
menu.pack(fill="both")
menu.pack_propagate(False)

#Creates mainframe
mainframe = tk.Frame(root)
mainframe.pack(fill="x")

#Creates editor-console pane
pane = tk.PanedWindow(mainframe, width=500, height=600, orient="vertical", sashrelief="raised", sashwidth=5)
pane.pack_propagate(False)
pane.pack()

#Editor/console
editor = tk.Text(pane, height=300//_font.metrics("linespace"), bg="#aaa", fg="black", font=_font)
editor.insert("1.0", "-[,.]")
pane.add(editor)
edshow = True
console = tk.Text(pane, height=300//_font.metrics("linespace"), state="disabled", font=_font)
pane.add(console)

#Functions for creaitng menu
def mbadd(name):
    m = tk.Menubutton(menu, text=name, padx=10)
    m.pack(side="left")
    return m

def menuadd(labl, cmd=()):
    menuprep.add_command(label=labl, command=cmd)

#File menu
mfile = mbadd("File")
menuprep = tk.Menu(mfile, tearoff=0)
def openbf():
    global path
    path = fd.askopenfilename(title="Select file to open", filetypes=[("Brainfuck files", ".bf"), ("Text files", "*.txt"), ("All files", "*.*")])
    editor.delete("1.0", "end")
    editor.insert("1.0", open(path).read())
    root.title(f"UnFucktion: A Brainfuck Interpreter - {path}")

def savebfas(save=False):
    global path
    if not (save and path):
        path = fd.asksaveasfilename(title="Save file", defaultextension=".bf", filetypes=[("Brainfuck files", ".bf"), ("Text files", "*.txt"), ("All files", "*.*")])
    if path:
        with open(path, "w") as file:
            file.write(editor.get("1.0", "end-1c"))

path = ""
menuadd("New file", lambda: exec("global path, editor; path=''; editor.delete('1.0', 'end'); root.title('UnFucktion: A Brainfuck Interpreter')"))
menuadd("Open file", openbf)
menuadd("Save", lambda: savebfas(True))
menuadd("Save as...", savebfas)
mfile["menu"] = menuprep

#Execution menu
mrun = mbadd("Run")
menuprep = tk.Menu(mrun, tearoff=0)

#Runs inpter
def runbf():
    global bfcode, started, edshow, pane, editor, inchar
    started = True
    inchar = queue(maxsize=100)
    if not edshow:
        pane.forget(editor)
    bfcode = editor.get("1.0", "end-1c")
    brainfuck(0)

menuadd("Run", runbf)
menuadd("Pause/Start", lambda : exec('global paused; paused = not paused'))
menuadd("Stop", lambda : exec('global started; started = False'))
mrun["menu"] = menuprep

#View settings menu
mview = mbadd("View")
menuprep = tk.Menu(mview, tearoff=0)
menuadd("Toggle memory view(uncoded)")

def togset():
    if settings.winfo_viewable():
        settings.withdraw()
    else:
        settings.deiconify()
        settings.lift()

menuadd("Toggle settings view", togset)
menuadd("Toggle editor on run", lambda : exec('global edshow; edshow = not edshow'))
mview["menu"] = menuprep

settings = tk.Toplevel(root)
settings.title("Settings")
settings.geometry("400x250")
settings.withdraw()
settings.protocol("WM_DELETE_WINDOW", settings.withdraw)

#Sliders
fontslide=tk.Scale(settings, from_=8, to=80, orient="horizontal", showvalue=True, length=300, label="Font size", command=lambda val: _font.configure(size=int(float(val))))
widthslide=tk.Scale(settings, from_=500, to=900, orient="horizontal", showvalue=True, length=300, label="Pane width", command=lambda val: pane.config(width=int(root.winfo_width()*float(val)/1000)))

#FPS management
def setbftime(val):
    global fps
    fps = float(val)
fpsslide=tk.Scale(settings, from_=3, to=120, orient="horizontal", showvalue=True, length=300, label="FPS", command=setbftime)

#Packes sliders
fontslide.pack(pady=5)
widthslide.pack(pady=5)
fpsslide.pack(pady=5)
fontslide.set("15")
widthslide.set("800")
fpsslide.set("60")

memview = tk.Toplevel(root)
memview.title("Settings")
memview.geometry("400x250")
memview.withdraw()
memview.protocol("WM_DELETE_WINDOW", memview.withdraw)

memwidth = 8
def setmemwidth(val):
    global memwidth
    memwidth = float(val)

memslide = tk.Scale(memview, from_=4, to=24, orient="horizontal", showvalue=True, length=300, label="Memory row size", command=setmemwidth)

#Output management
def outputque():
    global que
    try:
        ch = que.get_nowait()
    except Empty:
        pass
    else:
        console.config(state="normal")
        if ch == "\r":
            console.insert("end", "\n")
        elif ch == "\b":
            console.delete("end-2c")
        else:
            console.insert("end", ch)
        console.see("end")
        console.config(state="disabled")
    root.after(1, outputque)
outputque()
root.mainloop()

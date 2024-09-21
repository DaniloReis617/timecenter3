import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SubpageMenu = ({ isOpen, onClose, pages, basePath }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a subpage</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {pages.map((page, index) => (
            <Button key={index} asChild onClick={onClose}>
              <Link to={`${basePath}/${page.path}`}>{page.title}</Link>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubpageMenu;
